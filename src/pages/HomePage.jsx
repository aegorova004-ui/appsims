import { useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout.jsx'
import PageHero from '../components/PageHero.jsx'
import StatsGrid from '../components/StatsGrid.jsx'
import EntryForm from '../components/EntryForm.jsx'
import CollectionSection from '../components/CollectionSection.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import UndoToast from '../components/UndoToast.jsx'
import EditEntryModal from '../components/EditEntryModal.jsx'
import { STATUSES, TYPES } from '../data/constants.js'
import { translations } from '../data/translations.js'
import {
  getCreatorDisplayOptions,
  getAllCategories,
  getCategoriesForType,
  isCategoryAllowedForType,
  matchesSearch,
  sortKeysByLocalizedLabel,
} from '../lib/wishlist.js'
import { creatorsService } from '../lib/creatorsService.js'
import { wishlistService } from '../lib/wishlistService.js'
import useLanguage from '../hooks/useLanguage.js'
import useAuth from '../hooks/useAuth.js'

function HomePage() {
  const { language, toggleLanguage } = useLanguage()
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [creators, setCreators] = useState([])
  const [editingEntryId, setEditingEntryId] = useState(null)
  const [pendingDeleteEntry, setPendingDeleteEntry] = useState(null)
  const [recentlyDeletedEntry, setRecentlyDeletedEntry] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [creatorFilter, setCreatorFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const undoTimeoutRef = useRef(null)

  const content = translations[language]
  const formCategories = useMemo(
    () => getCategoriesForType(TYPES[0]),
    [],
  )
  const filterCategories = useMemo(
    () => {
      const categoryKeys =
        typeFilter === 'all' ? getAllCategories() : getCategoriesForType(typeFilter)

      return sortKeysByLocalizedLabel(
        categoryKeys,
        content.categoryLabels,
        language === 'ru' ? 'ru' : 'en',
      )
    },
    [content.categoryLabels, language, typeFilter],
  )
  const creatorOptions = useMemo(
    () =>
      getCreatorDisplayOptions(
        creators.length ? creators : entries,
        language === 'ru' ? 'ru' : 'en',
      ),
    [creators, entries, language],
  )
  const editingEntry = useMemo(
    () => entries.find((entry) => entry.id === editingEntryId) ?? null,
    [editingEntryId, entries],
  )

  useEffect(() => {
    let isMounted = true

    async function loadEntries() {
      if (!user?.id) {
        if (isMounted) {
          setEntries([])
          setCreators([])
        }

        return
      }

      try {
        const nextEntries = await wishlistService.getEntries({
          userId: user.id,
        })

        let nextCreators = []

        try {
          nextCreators = await creatorsService.getCreators({
            userId: user.id,
          })
        } catch (creatorError) {
          console.error('Failed to load creators from Supabase.', creatorError)
        }

        if (isMounted) {
          setEntries(nextEntries)
          setCreators(nextCreators)
        }
      } catch (error) {
        console.error('Failed to load wishlist entries from Supabase.', error)

        if (isMounted) {
          setEntries([])
          setCreators([])
        }
      }
    }

    loadEntries()

    return () => {
      isMounted = false
    }
  }, [user?.id])

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        window.clearTimeout(undoTimeoutRef.current)
      }
    }
  }, [])

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesCreator =
        creatorFilter === 'all' ? true : entry.creator === creatorFilter
      const matchesType =
        typeFilter === 'all' ? true : entry.type === typeFilter
      const matchesStatus =
        statusFilter === 'all' ? true : entry.status === statusFilter
      const matchesCategory =
        categoryFilter === 'all' ? true : entry.category === categoryFilter

      return (
        matchesCreator &&
        matchesType &&
        matchesStatus &&
        matchesCategory &&
        matchesSearch(entry, searchQuery)
      )
    })
  }, [categoryFilter, creatorFilter, entries, searchQuery, statusFilter, typeFilter])

  const stats = useMemo(() => {
    return {
      total: entries.length,
      wishlist: entries.filter((entry) => entry.status === 'Wishlist').length,
      installed: entries.filter((entry) => entry.status === 'Installed').length,
      broken: entries.filter((entry) => entry.status === 'Broken').length,
    }
  }, [entries])

  async function handleAddEntry(formData) {
    if (!user?.id) {
      return false
    }

    try {
      const createdEntry = await wishlistService.createEntry(formData, {
        creatorOptions,
        scope: {
          userId: user.id,
        },
      })

      setEntries((currentEntries) => [createdEntry, ...currentEntries])
      await refreshCreators()
      return true
    } catch (error) {
      console.error('Failed to create wishlist entry in Supabase.', error)
      return false
    }
  }

  async function handleConfirmDelete() {
    if (!user?.id || !pendingDeleteEntry) {
      return
    }

    try {
      await wishlistService.deleteEntry(pendingDeleteEntry.id, {
        userId: user.id,
      })

      if (editingEntryId === pendingDeleteEntry.id) {
        setEditingEntryId(null)
      }

      setEntries((currentEntries) =>
        currentEntries.filter((entry) => entry.id !== pendingDeleteEntry.id),
      )
      setPendingDeleteEntry(null)
      await refreshCreators()
      showUndoToast(pendingDeleteEntry)
    } catch (error) {
      console.error('Failed to delete wishlist entry from Supabase.', error)
    }
  }

  async function handleSaveEntry(formData) {
    if (!editingEntryId) {
      return handleAddEntry(formData)
    }

    if (!user?.id) {
      return false
    }

    try {
      const updatedEntry = await wishlistService.updateEntry(
        editingEntryId,
        formData,
        {
          creatorOptions,
          scope: {
            userId: user.id,
          },
        },
      )

      setEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntryId ? updatedEntry : entry,
        ),
      )
      setEditingEntryId(null)
      await refreshCreators()
      return true
    } catch (error) {
      console.error('Failed to update wishlist entry in Supabase.', error)
      return false
    }
  }

  async function handleCycleStatus(entryId) {
    if (!user?.id) {
      return
    }

    try {
      const updatedEntry = await wishlistService.cycleEntryStatus(
        entryId,
        entries,
        STATUSES,
        {
          userId: user.id,
        },
      )

      setEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === entryId ? updatedEntry : entry,
        ),
      )
    } catch (error) {
      console.error('Failed to update wishlist entry status in Supabase.', error)
    }
  }

  function handleStatFilter(status) {
    setStatusFilter((currentStatus) => {
      if (status === 'all') {
        return currentStatus === 'all' ? 'all' : 'all'
      }

      return currentStatus === status ? 'all' : status
    })
  }

  function handleResetFilters() {
    setSearchQuery('')
    setCreatorFilter('all')
    setTypeFilter('all')
    setCategoryFilter('all')
    setStatusFilter('all')
  }

  function handleTypeFilterChange(nextType) {
    setTypeFilter(nextType)

    if (
      categoryFilter !== 'all' &&
      !isCategoryAllowedForType(nextType, categoryFilter)
    ) {
      setCategoryFilter('all')
    }
  }

  function handleEditEntry(entryId) {
    setEditingEntryId(entryId)
  }

  function handleCancelEdit() {
    setEditingEntryId(null)
  }

  function handleDeleteEntry(entryId) {
    const entryToDelete =
      entries.find((entry) => entry.id === entryId) ?? null

    setPendingDeleteEntry(entryToDelete)
  }

  function handleCancelDelete() {
    setPendingDeleteEntry(null)
  }

  function showUndoToast(entry) {
    if (undoTimeoutRef.current) {
      window.clearTimeout(undoTimeoutRef.current)
    }

    setRecentlyDeletedEntry(entry)
    undoTimeoutRef.current = window.setTimeout(() => {
      setRecentlyDeletedEntry(null)
      undoTimeoutRef.current = null
    }, 6000)
  }

  async function handleUndoDelete() {
    if (!user?.id || !recentlyDeletedEntry) {
      return
    }

    try {
      const restoredEntry = await wishlistService.restoreEntry(
        recentlyDeletedEntry,
        {
          userId: user.id,
        },
      )

      setEntries((currentEntries) => [restoredEntry, ...currentEntries])
      setRecentlyDeletedEntry(null)
      await refreshCreators()

      if (undoTimeoutRef.current) {
        window.clearTimeout(undoTimeoutRef.current)
        undoTimeoutRef.current = null
      }
    } catch (error) {
      console.error('Failed to restore wishlist entry in Supabase.', error)
    }
  }

  function handleDismissUndoToast() {
    setRecentlyDeletedEntry(null)

    if (undoTimeoutRef.current) {
      window.clearTimeout(undoTimeoutRef.current)
      undoTimeoutRef.current = null
    }
  }

  async function refreshCreators() {
    if (!user?.id) {
      setCreators([])
      return
    }

    try {
      const nextCreators = await creatorsService.getCreators({
        userId: user.id,
      })

      setCreators(nextCreators)
    } catch (error) {
      console.error('Failed to refresh creators from Supabase.', error)
    }
  }

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    creatorFilter !== 'all' ||
    typeFilter !== 'all' ||
    categoryFilter !== 'all' ||
    statusFilter !== 'all'

  const activeFilterChips = useMemo(() => {
    const chips = []

    if (creatorFilter !== 'all') {
      chips.push({
        key: 'creator',
        label: content.collection.toolbar.creatorLabel,
        value: creatorFilter,
      })
    }

    if (categoryFilter !== 'all') {
      chips.push({
        key: 'category',
        label: content.collection.toolbar.categoryLabel,
        value: content.categoryLabels[categoryFilter],
      })
    }

    if (typeFilter !== 'all') {
      chips.push({
        key: 'type',
        label: content.collection.toolbar.typeLabel,
        value: content.typeLabels[typeFilter],
      })
    }

    if (statusFilter !== 'all') {
      chips.push({
        key: 'status',
        label: content.collection.toolbar.statusLabel,
        value: content.statusLabels[statusFilter],
      })
    }

    if (searchQuery.trim()) {
      chips.push({
        key: 'search',
        label: content.collection.toolbar.searchLabel,
        value: searchQuery.trim(),
      })
    }

    return chips
  }, [
    categoryFilter,
    content.categoryLabels,
    content.collection.toolbar.categoryLabel,
    content.collection.toolbar.creatorLabel,
    content.collection.toolbar.searchLabel,
    content.collection.toolbar.statusLabel,
    content.collection.toolbar.typeLabel,
    content.statusLabels,
    content.typeLabels,
    creatorFilter,
    searchQuery,
    statusFilter,
    typeFilter,
  ])

  return (
    <MainLayout>
      <PageHero
        labels={content.hero}
        currentLanguage={language}
        onToggleLanguage={toggleLanguage}
      />

      <StatsGrid
        stats={stats}
        labels={content.stats}
        activeStatus={statusFilter}
        onStatClick={handleStatFilter}
      />

      <section className="dashboard-grid">
        <EntryForm
          labels={{
            ...content.form,
            categoryLabels: content.categoryLabels,
            statusLabels: content.statusLabels,
            typeLabels: content.typeLabels,
          }}
          options={{
            types: TYPES,
            categories: formCategories,
            statuses: STATUSES,
            creators: creatorOptions,
            locale: language === 'ru' ? 'ru' : 'en',
          }}
          onSubmit={handleAddEntry}
        />

        <CollectionSection
          labels={content.collection}
          entries={filteredEntries}
          searchValue={searchQuery}
          creatorFilterValue={creatorFilter}
          typeFilterValue={typeFilter}
          statusFilterValue={statusFilter}
          categoryFilterValue={categoryFilter}
          onSearchChange={setSearchQuery}
          onCreatorFilterChange={setCreatorFilter}
          onTypeFilterChange={handleTypeFilterChange}
          onStatusFilterChange={setStatusFilter}
          onCategoryFilterChange={setCategoryFilter}
          onResetFilters={handleResetFilters}
          creators={creatorOptions}
          types={TYPES}
          categories={filterCategories}
          statuses={STATUSES}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
          onCycleStatus={handleCycleStatus}
          hasActiveFilters={hasActiveFilters}
          activeFilterChips={activeFilterChips}
          typeLabels={content.typeLabels}
        />
      </section>

      {pendingDeleteEntry ? (
        <ConfirmDialog
          labels={content.collection.deleteConfirm}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      ) : null}

      {editingEntry ? (
        <EditEntryModal
          key={editingEntry.id}
          labels={content.form.editModal}
          options={{
            types: TYPES,
            categories: formCategories,
            statuses: STATUSES,
            creators: creatorOptions,
            locale: language === 'ru' ? 'ru' : 'en',
          }}
          entry={editingEntry}
          onCancel={handleCancelEdit}
          onSave={handleSaveEntry}
        />
      ) : null}

      {recentlyDeletedEntry ? (
        <UndoToast
          labels={content.collection.deleteToast}
          onUndo={handleUndoDelete}
          onDismiss={handleDismissUndoToast}
        />
      ) : null}
    </MainLayout>
  )
}

export default HomePage

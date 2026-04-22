function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <div className="app-shell__backdrop" aria-hidden="true" />
      <main className="app-shell__content">{children}</main>
    </div>
  )
}

export default MainLayout

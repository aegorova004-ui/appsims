import { creatorsRepository } from './creatorsRepository.js'

export const creatorsService = {
  getCreators,
  ensureCreator,
}

async function getCreators(scope = {}) {
  return creatorsRepository.loadCreators(scope)
}

async function ensureCreator(creatorName, scope = {}) {
  return creatorsRepository.ensureCreator(creatorName, scope)
}

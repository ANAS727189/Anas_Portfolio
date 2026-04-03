'use client'

import { useEffect, useMemo, useState } from 'react'
import { projectsData, type ProjectData } from '@/data/projects/projects'

export interface ProjectsAdminState {
  customProjects: ProjectData[]
  top3Keys: string[]
}

const STORAGE_KEY = 'anas_portfolio_projects_admin_v1'
const UPDATE_EVENT = 'projects-admin-updated'

export const getProjectKey = (project: ProjectData): string => project.id || project.title

const getDefaultTop3Keys = (): string[] =>
  [...projectsData]
    .filter((project) => project.weeklyRank)
    .sort((a, b) => (a.weeklyRank ?? 99) - (b.weeklyRank ?? 99))
    .slice(0, 3)
    .map(getProjectKey)

export const loadProjectsAdminState = (): ProjectsAdminState => {
  const fallback: ProjectsAdminState = {
    customProjects: [],
    top3Keys: getDefaultTop3Keys(),
  }

  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback

    const parsed = JSON.parse(raw) as Partial<ProjectsAdminState>
    return {
      customProjects: Array.isArray(parsed.customProjects) ? parsed.customProjects : [],
      top3Keys:
        Array.isArray(parsed.top3Keys) && parsed.top3Keys.length > 0
          ? parsed.top3Keys
          : fallback.top3Keys,
    }
  } catch {
    return fallback
  }
}

export const saveProjectsAdminState = (state: ProjectsAdminState) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new Event(UPDATE_EVENT))
}

export const clearProjectsAdminState = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(UPDATE_EVENT))
}

export const useProjectsCatalog = () => {
  const [adminState, setAdminState] = useState<ProjectsAdminState>({
    customProjects: [],
    top3Keys: getDefaultTop3Keys(),
  })

  useEffect(() => {
    const sync = () => setAdminState(loadProjectsAdminState())
    sync()

    window.addEventListener('storage', sync)
    window.addEventListener(UPDATE_EVENT, sync)

    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(UPDATE_EVENT, sync)
    }
  }, [])

  const allProjects = useMemo(
    () => [...adminState.customProjects, ...projectsData],
    [adminState.customProjects]
  )

  const topThree = useMemo(() => {
    const selected = adminState.top3Keys
      .map((key) => allProjects.find((project) => getProjectKey(project) === key))
      .filter((project): project is ProjectData => Boolean(project))
      .slice(0, 3)

    if (selected.length === 3) return selected

    const defaults = [...allProjects]
      .filter((project) => project.weeklyRank)
      .sort((a, b) => (a.weeklyRank ?? 99) - (b.weeklyRank ?? 99))
      .slice(0, 3)

    return defaults
  }, [adminState.top3Keys, allProjects])

  return {
    allProjects,
    topThree,
  }
}

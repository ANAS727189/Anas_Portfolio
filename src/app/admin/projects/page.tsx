'use client'

import { useMemo, useState } from 'react'
import BackButton from '@/components/BackButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  clearProjectsAdminState,
  getProjectKey,
  loadProjectsAdminState,
  saveProjectsAdminState,
  useProjectsCatalog,
} from '@/lib/useProjectsCatalog'
import type { ProjectData } from '@/data/projects/projects'

const emptyForm = {
  title: '',
  image: '',
  description: '',
  technologies: '',
  features: '',
  liveLink: '',
  githubLink: '',
}

export default function AdminProjectsPage() {
  const initial = useMemo(() => loadProjectsAdminState(), [])
  const { allProjects } = useProjectsCatalog()

  const [customProjects, setCustomProjects] = useState<ProjectData[]>(initial.customProjects)
  const [top1, setTop1] = useState(initial.top3Keys[0] ?? '')
  const [top2, setTop2] = useState(initial.top3Keys[1] ?? '')
  const [top3, setTop3] = useState(initial.top3Keys[2] ?? '')
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')

  const uniqueError = [top1, top2, top3].filter(Boolean).length !== new Set([top1, top2, top3].filter(Boolean)).size

  const previewProjects = [...customProjects, ...allProjects.filter((p) => !customProjects.some((c) => getProjectKey(c) === getProjectKey(p)))]

  const addProject = () => {
    if (!form.title.trim() || !form.description.trim() || !form.technologies.trim()) {
      setStatus('Title, description, and technologies are required.')
      return
    }

    const project: ProjectData = {
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      image: form.image.trim() || undefined,
      description: form.description.trim(),
      technologies: form.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      features: form.features
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      liveLink: form.liveLink.trim() || undefined,
      githubLink: form.githubLink.trim() || undefined,
    }

    setCustomProjects((prev) => [project, ...prev])
    setForm(emptyForm)
    setStatus('Project added locally. Click Save All Changes.')
  }

  const removeCustomProject = (id: string) => {
    setCustomProjects((prev) => prev.filter((project) => project.id !== id))
    setStatus('Project removed locally. Click Save All Changes.')
  }

  const saveAll = () => {
    if (uniqueError) {
      setStatus('Top 3 projects must be unique.')
      return
    }

    saveProjectsAdminState({
      customProjects,
      top3Keys: [top1, top2, top3].filter(Boolean),
    })

    setStatus('Saved. Landing podium and projects page are now updated.')
  }

  const resetAll = () => {
    clearProjectsAdminState()
    setCustomProjects([])
    setTop1('')
    setTop2('')
    setTop3('')
    setStatus('Admin state cleared. Default project data restored.')
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      <BackButton className="mb-6" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Projects Admin</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Add projects from frontend and choose your top 3 podium projects.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">
          <h2 className="text-xl font-semibold">Add New Project</h2>
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <Input
            placeholder="Image path (e.g. /my-project.png)"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          />
          <Textarea
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <Input
            placeholder="Technologies (comma separated)"
            value={form.technologies}
            onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
          />
          <Textarea
            placeholder="Features (one per line)"
            value={form.features}
            onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
          />
          <Input
            placeholder="Live link"
            value={form.liveLink}
            onChange={(e) => setForm((f) => ({ ...f, liveLink: e.target.value }))}
          />
          <Input
            placeholder="GitHub link"
            value={form.githubLink}
            onChange={(e) => setForm((f) => ({ ...f, githubLink: e.target.value }))}
          />

          <Button onClick={addProject} className="w-full">Add Project</Button>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">
          <h2 className="text-xl font-semibold">Podium Controls</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pick Top 1, Top 2, Top 3 (unique projects).</p>

          <select className="w-full rounded-md border bg-transparent p-2" value={top1} onChange={(e) => setTop1(e.target.value)}>
            <option value="">Select Top 1</option>
            {previewProjects.map((project) => (
              <option key={`t1-${getProjectKey(project)}`} value={getProjectKey(project)}>
                {project.title}
              </option>
            ))}
          </select>

          <select className="w-full rounded-md border bg-transparent p-2" value={top2} onChange={(e) => setTop2(e.target.value)}>
            <option value="">Select Top 2</option>
            {previewProjects.map((project) => (
              <option key={`t2-${getProjectKey(project)}`} value={getProjectKey(project)}>
                {project.title}
              </option>
            ))}
          </select>

          <select className="w-full rounded-md border bg-transparent p-2" value={top3} onChange={(e) => setTop3(e.target.value)}>
            <option value="">Select Top 3</option>
            {previewProjects.map((project) => (
              <option key={`t3-${getProjectKey(project)}`} value={getProjectKey(project)}>
                {project.title}
              </option>
            ))}
          </select>

          {uniqueError && <p className="text-sm text-rose-500">Top 3 selections must be unique.</p>}

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={saveAll}>Save All Changes</Button>
            <Button variant="outline" onClick={resetAll}>Reset Admin Data</Button>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="text-lg font-semibold mb-3">Custom Projects ({customProjects.length})</h3>
        {customProjects.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No custom projects added yet.</p>
        ) : (
          <div className="space-y-2">
            {customProjects.map((project) => (
              <div key={project.id || project.title} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span>{project.title}</span>
                <Button variant="outline" onClick={() => removeCustomProject(project.id || '')}>Remove</Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {status && <p className="mt-4 text-sm text-blue-600 dark:text-blue-400">{status}</p>}
    </section>
  )
}

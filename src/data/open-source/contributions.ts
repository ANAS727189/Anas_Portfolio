export interface OpenSourceContribution {
  project: string;
  description: string;
  merged: number;
  open: number;
  highlights: string[];
  link: string;
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    project: 'lfortran/lfortran',
    description:
      'Compiler contributions across parser semantics, regression coverage, and crash fixes.',
    merged: 8,
    open: 3,
    highlights: [
      'Legacy slash-initialization syntax support in declarations',
      'Optional array bounds-check skip fix',
      'Forward referenced procedure pointer handling fixes',
    ],
    link: 'https://github.com/lfortran/lfortran/pulls?q=is%3Apr+is%3Aclosed+author%3AANAS727189',
  },
  {
    project: 'sympy/sympy',
    description: 'Math engine quality improvements focused on precision and recursion safety.',
    merged: 2,
    open: 0,
    highlights: [
      'Precision loss fix in evalf_log for args close to 1',
      'Regression test for gaussian integral recursion error',
    ],
    link: 'https://github.com/sympy/sympy/pulls?q=is%3Apr+is%3Aclosed+author%3AANAS727189',
  },
  {
    project: 'golang/tools (gopls)',
    description: 'Merged fix for panic prevention inside gopls MCP symbol references flow.',
    merged: 1,
    open: 0,
    highlights: [
      'Nil types.Object panic guard added in symbolReferencesHandler',
      'Reviewed and merged through Go Gerrit + LUCI checks',
    ],
    link: 'https://go-review.googlesource.com/c/tools/+/697315',
  },
  {
    project: 'learningequality/studio',
    description: 'UI modernization support in the Vuetify removal migration.',
    merged: 1,
    open: 0,
    highlights: ['Upload progress and save-failed dialogs update in Studio migration'],
    link: 'https://github.com/learningequality/studio',
  },
];

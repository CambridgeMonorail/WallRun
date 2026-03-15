import type { LintRule } from '../types.js';

import {
  ruleInvalidNameFormat,
  ruleMissingDescription,
  ruleMissingName,
  ruleReservedWordInName,
  ruleWeakDescription,
} from './metadata.js';
import {
  ruleBrokenLocalLinks,
  ruleMissingSkillMd,
  ruleOrphanSupportingFiles,
} from './structure.js';
import {
  ruleInlineExampleDensity,
  ruleLargeSection,
  ruleMissingOutputFormat,
  ruleMissingWorkflow,
  ruleSkillMdTooLong,
} from './content.js';
import {
  ruleNoProgressiveDisclosure,
  ruleSupportingFilesWithoutContext,
  ruleUnreferencedReferences,
  ruleUnreferencedScripts,
} from './disclosure.js';
import { ruleJunkAssets, ruleTooManyOtherFiles } from './supporting-files.js';
import { ruleMissingTestPlan, ruleNoExpectedBehaviour } from './testability.js';
import {
  ruleBackgroundKnowledgeUserInvocable,
  ruleUnsafeInvocation,
} from './safety.js';

export const allRules: LintRule[] = [
  // Metadata
  ruleMissingName,
  ruleMissingDescription,
  ruleInvalidNameFormat,
  ruleWeakDescription,
  ruleReservedWordInName,

  // Structure
  ruleMissingSkillMd,
  ruleBrokenLocalLinks,
  ruleOrphanSupportingFiles,

  // Content
  ruleSkillMdTooLong,
  ruleLargeSection,
  ruleMissingWorkflow,
  ruleMissingOutputFormat,
  ruleInlineExampleDensity,

  // Progressive disclosure
  ruleNoProgressiveDisclosure,
  ruleUnreferencedScripts,
  ruleUnreferencedReferences,
  ruleSupportingFilesWithoutContext,

  // Supporting files
  ruleJunkAssets,
  ruleTooManyOtherFiles,

  // Testability
  ruleMissingTestPlan,
  ruleNoExpectedBehaviour,

  // Safety
  ruleUnsafeInvocation,
  ruleBackgroundKnowledgeUserInvocable,
];

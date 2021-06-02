import { MASTERY_TAG } from './MasteryLabel';

export function calculateObjectiveMastery(objective){
  const masteredTasks = objective.tasks.filter(task =>
    task.mastery == MASTERY_TAG.MASTERED
  );

  if(masteredTasks.length == objective.tasks.length) return MASTERY_TAG.MASTERED;

  const unGradedTasks = objective.tasks.filter(task =>
    task.mastery == MASTERY_TAG.NOT_GRADED
  );

  if(unGradedTasks.length == objective.tasks.length) return MASTERY_TAG.NOT_GRADED;

  return MASTERY_TAG.NEARLY_MASTERED;
}

export function calculateTargetMastery(targetProgress){
  const masteredObjectives = targetProgress.objectives.filter(objective =>
    calculateObjectiveMastery(objective) == MASTERY_TAG.MASTERED
  );

  if(masteredObjectives.length == targetProgress.objectives.length){
    return MASTERY_TAG.MASTERED;
  }

  const unGradedObjectives = targetProgress.objectives.filter(objective =>
    calculateObjectiveMastery(objective) == MASTERY_TAG.NOT_GRADED
  );

  if(unGradedObjectives.length == targetProgress.objectives.length) return MASTERY_TAG.NOT_GRADED;

  return MASTERY_TAG.NEARLY_MASTERED;
}
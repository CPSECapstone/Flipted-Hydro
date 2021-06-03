
function getUpdatedTaskProgress(taskProgressList, taskId, submission){

  const newTaskProgressList = [];

  taskProgressList.forEach(progress => {
    if(progress.taskId == taskId){
      console.log(submission);
      newTaskProgressList.push({
        ...progress,
        submission: submission
      })
    } else {
      newTaskProgressList.push(progress)
    }
  })

  return newTaskProgressList;
}

export function getUpdatedMissionProgress(existingProgress, missionRef, taskId, submission){
  const newMissionProgress = [];

  existingProgress.forEach(missionProgress => {
    if(missionProgress.mission.__ref == missionRef){
      newMissionProgress.push({
        ...missionProgress,
        progress: getUpdatedTaskProgress(missionProgress.progress, taskId, submission)
      })
    } else {
      newMissionProgress.push(missionProgress)
    }
  })

  return newMissionProgress;
}
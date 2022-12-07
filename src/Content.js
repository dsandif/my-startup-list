import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import {
  groupDataByProperty,
  loadStorageData,
  getRandomFact
} from './helpers'

const Content = () => {
  const [taskList, setTaskList] = useState(loadStorageData()) // init state with either storage data or the data from remote resource
  const tasks = groupDataByProperty(taskList, 'type') //group taskList by heading (aka type)
  const headings = Object.keys(tasks)
  const taskProgress = groupDataByProperty(taskList, "done") // group all tasks by done/not done aka true/false
  const allDone = !taskProgress.hasOwnProperty('false') // if false exists at all then not done

  const handleChange = (taskItem) => {
    const newList = taskList.map(t => {
      if(t.id === taskItem.id){
        return {
          ...taskItem,
          done: !taskItem.done
        }
      }
      return t
    })
    setTaskList(newList)
    localStorage.setItem('savedTaskList', JSON.stringify(newList)) // save new copy of list to local storage on each update
  }
  
  //chcek if previouse phase complete
  const prevPhaseComplete = (currentHeadingIdx) =>{
    const prevHeading = headings[currentHeadingIdx-1]
    if(prevHeading){
      const previousPhaseProgress = groupDataByProperty(tasks[prevHeading], 'done')
      return !previousPhaseProgress.hasOwnProperty('false')
    }
    return true
  }

  useEffect(() => {
    if(allDone === true){
      getRandomFact()
    }
  }, [allDone])

  return(<>
    {
      headings.map((heading, idx) => {
        const headingNum = idx+1
        const taskItems = tasks[heading]
        const previousListAllDone = prevPhaseComplete(idx)
        const doneTasksGrouped = groupDataByProperty(tasks[heading], "done") // group tasks by "true" = done, "false" = not done
        const showHeadingCheck = !doneTasksGrouped.hasOwnProperty('false') // if false exists at all then the section is not done (dont show heading check)

        //format tasks for display
        const displayedTasks = taskItems.map(
          (taskItem) => 
          <Checkbox
              key={taskItem.id}
              label={taskItem.description}
              value={taskItem.done}
              onChange={(ev) => handleChange(taskItem)}
              disabled={!previousListAllDone}
          />
        )
        
        return (
          <div style={{width: '100%', textAlign: 'left', paddingLeft:'50%', textTransform: 'capitalize'}}key={headingNum}>
            <h4>
              <span style={{display: 'inline-block', marginRight: 10, verticalAlign: 'middle', textAlign:'center', color:'#282c34', backgroundColor: 'aquamarine', fontSize:18, padding:5, height:25, width:25, borderRadius: '50%'}}>{headingNum}</span>{`${heading}`} 
              {<span style={{color: showHeadingCheck? 'aquamarine' : 'transparent', marginLeft:10}}>&#x2713;</span>}
            </h4>
            {displayedTasks}
          </div>
        )
      })
    }
  </>)
}

export default Content
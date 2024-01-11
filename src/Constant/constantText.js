export const instruction = [
{Environment_Setup:
[   "Make sure the flower and any surrounding physical objects are in their intended positions.",
   "Clear the area of any unnecessary objects that may obstruct the robot's mapping process."
]},
{Safety_Check:
   ["Verify that there are no obstacles or hazards that could pose a risk to the robot or the mapped area."]
},
{Communication:["Establish a stable communication link between the operator and the robot."]
},
{Initiate_Mapping_Mode:
   ["Command the robot to enter the mapping mode."]
},
{Stay_Still_Command:
  [ "Clearly instruct the robot to keep all physical objects, especially the flower, in their current positions during the mapping process.","Emphasize the importance of stability for accurate mapping results."]
},
{Monitor_and_Adjust:
   ["Continuously monitor the mapping progress to ensure accurate data collection.",
   "If any physical objects are accidentally moved, stop the mapping process and manually reset the objects to their original positions.",],
},
{Obstacle_Avoidance:
   ["Instruct the robot to navigate around the flower and other objects while mapping, avoiding collisions."],
},
{Completion_and_Report:
   ["Once the mapping is complete, instruct the robot to provide a status report.","Review the mapped data for accuracy and completeness."],
},
{Exit_Mapping_Mode:
    ['Command the robot to exit mapping mode safely.'],},
{Notes:
 ["If at any point there is a risk of collision, pause the mapping process and address the situation before continuing.",
 "Emphasize the importance of precision and caution during the entire mapping operation."]}

]
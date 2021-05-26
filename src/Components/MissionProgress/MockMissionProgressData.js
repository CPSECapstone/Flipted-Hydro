const mockMissionProgressData = {
  "getAllMissionProgress": [
    {
      "mission": {
        "id": "MISSION#123",
        "name": "Backend-Mocked Mission"
      },
      "progress": [
        {
          "taskId": "TASK#1",
          "name": "Mock task 1",
          "submission": {
            "graded": true,
            "pointsAwarded": 93,
            "pointsPossible": 100
          }
        },
        {
          "taskId": "TASK#2",
          "name": "Mock Task 2",
          "submission": {
            "graded": true,
            "pointsAwarded": 14,
            "pointsPossible": 25
          }
        },
        {
          "taskId": "TASK#2",
          "name": "Mock Task 3: Submitted yet not graded",
          "submission": {
            "graded": false,
            "pointsAwarded": null,
            "pointsPossible": null
          }
        },
        {
          "taskId": "TASK#2",
          "name": "Mock Task 4: No Submission",
          "submission": null
        }
      ],
      "student": "MOCKUSER_123"
    }
  ]
};

export default mockMissionProgressData;
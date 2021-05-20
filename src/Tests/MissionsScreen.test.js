import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import {MissionsScreenDisplay, calculateMissionProgress, redirectToMission} from '../Components/MissionsScreen.js';

const mockProgressData = {
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
                "graded": true
              }
            },
            {
              "taskId": "TASK#2",
              "name": "Mock Task 2",
              "submission": {
                "graded": true
              }
            },
            {
              "taskId": "TASK#3",
              "name": "Mock Task 3: Submitted yet not graded",
              "submission": {
                "graded": false
              }
            },
            {
              "taskId": "TASK#4",
              "name": "Mock Task 4: No Submission",
              "submission": null
            }
          ],
          "student": "MOCKUSER_123"
        }
      ]
  }

const mockMissionData = {missions: [
    {name: "FakeMission1", description: "this is the 1st fake mission", id: "fakeMissionId1"},
    {name: "FakeMission2", description: "this is the 2nd fake mission", id: "fakeMissionId2"},
    {name: "FakeMission3", description: "this is the 3rd fake mission", id: "fakeMissionId3"},
  ]}

const mockFocusedMission = null;

const mockSetFocusedMission = jest.fn();

afterEach(() => {
    cleanup();
});

test("Test for the course title", () => {
    render(MissionsScreenDisplay(mockMissionData, mockProgressData, [], mockFocusedMission, mockSetFocusedMission));
    const mscreen = screen.getByTestId("courseTitle");
    expect(mscreen).toBeInTheDocument();
    expect(mscreen).toHaveTextContent("Integrated Science");
});

test("Test for the missions to be displayed", () => {
    render(MissionsScreenDisplay(mockMissionData, mockProgressData, [], mockFocusedMission, mockSetFocusedMission));
    var mscreen = screen.getByTestId(mockMissionData.missions[0].id);
    expect(mscreen).toBeInTheDocument();
    mscreen = screen.getByTestId(mockMissionData.missions[1].id);
    expect(mscreen).toBeInTheDocument();
    mscreen = screen.getByTestId(mockMissionData.missions[2].id);
    expect(mscreen).toBeInTheDocument();
});

test("Test that clicking on a mission sets the focused mission", () => {
    let mockHistory = [];
    render(MissionsScreenDisplay(mockMissionData, mockProgressData, mockHistory, mockFocusedMission, mockSetFocusedMission));
    const mscreen = screen.getByTestId(mockMissionData.missions[0].id);
    expect(mscreen).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(mockMissionData.missions[0].id));
    expect(mockSetFocusedMission).toHaveBeenCalled();
    
});

test("Test that the mission overview is displayed and redirect button works", () => {
    let mockHistory = [];
    let focusedMission = mockMissionData.missions[0];
    render(MissionsScreenDisplay(mockMissionData, mockProgressData, mockHistory, focusedMission, mockSetFocusedMission));
    
    expect(screen.getByTestId("missionOverview")).toBeInTheDocument();
    expect(screen.getByTestId("missionOverview")).toHaveTextContent(mockMissionData.missions[0].name);
    expect(screen.getByTestId("missionOverview")).toHaveTextContent(mockMissionData.missions[0].description);
    expect(screen.getByTestId("missionOverviewProgressBar")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("redirectToMissionButton"));

    var historyObj = mockHistory.pop();
    expect(historyObj.pathname).toBe("/mission");
    expect(historyObj.state.id).toBe(mockMissionData.missions[0].id);
    
});

test("Test progress calculation for mission that is not in the progress list", () => {
    let missionId = "NULLID";
    expect(calculateMissionProgress(missionId, mockProgressData)).toBe(0);
});

test("Test successful progress calculation", () => {
    let missionId = "MISSION#123";
    expect(calculateMissionProgress(missionId, mockProgressData)).toBe(75);
});

test("Test redirect to mission", () => {
    let mockHistory = [];
    redirectToMission(mockHistory, "missionId");
    var historyObj = mockHistory.pop();
    expect(historyObj.pathname).toBe("/mission");
    expect(historyObj.state.id).toBe("missionId");
});
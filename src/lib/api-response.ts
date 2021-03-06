export interface User {
  id: string;
  name: string;
  email: string;
  roleID: number;
  authIDs?: number[];
}

export interface Form {
  formID: string;
  classroomID: string;
  timeRange: {
    date: string;
    startPeriod: string;
    endPeriod: string;
  };
  progress: number;
}

export interface Person {
  id: string;
  name: string;
}

export interface Classroom {
  id: string;
  type: string;
  capacity: number;
  price: number;
}

export interface SemesterCourse {
  id: string;
  name: string;
  time: string;
  teacherID: string;
  classroomID: string;
}

export interface Equipment {
  id: string;
  name: string;
  status: number;
  type: string;
}

export interface CardRecord {
  id: number;
  classroomID: string;
  recordTime: Date;
  swipeResult: number;
  cardOwner: string;
}

export interface ScheduleResult {
  date: string;
  period: string;
  classroomID: string;
  scID?: string;
  formID?: string;
  status: number;
}

export class ClassroomDateSchedule {
  classroomID: string;
  date: string;
  scheduleResults: { [x: string]: ScheduleResult } = {};
}

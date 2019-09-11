import { SwipeCardResult, ScheduleChangeType } from './constant-manager';

export interface DatePeriodRangeDto {
  date: Date;
  startPeriod: string;
  endPeriod: string;
}

export interface CreateCardRecardDto {
  uid: string;
  classroomID: string;
  recordTime: Date;
  status: SwipeCardResult;
}

export interface CreateGeneralBookingFormDto {
  applicantName: string;
  applicantEmail: string;
  timeRange: DatePeriodRangeDto;
  reason: string;
  classroomID: string;
  equipmentIDs?: string[];
}

export interface CreateIIMBookingFormDto {
  applicantID: string;
  applicantEmail: string;
  timeRange: DatePeriodRangeDto;
  reason: string;
  classroomID: string;
  equipmentIDs?: string[];
}

export interface CreateMakeupCourseFormDto {
  scID: string;
  timeRange: DatePeriodRangeDto;
  classroomID: string;
}

export interface CreateScheduleChangeDto {
  personID: string;
  scID: string;
  formID: string;
  timeRange: DatePeriodRangeDto;
  type: ScheduleChangeType;
  classroomID: string;
}

export interface CreateSemesterCourseDto {
  year: number;
  semester: number;
  courseID: string;
  courseNo: string;
  time?: string;
  teacherID?: string;
  classroomID?: string;
}

export interface CreateUserDto {
  userID: string;
  password: string;
  name: string;
  email: string;
}

export interface SuspendedCourseDto {
  scID: string;
  timeRange: DatePeriodRangeDto;
}

export interface UpdateSemesterCourseDto {
  time?: string;
  classroomID?: string;
}

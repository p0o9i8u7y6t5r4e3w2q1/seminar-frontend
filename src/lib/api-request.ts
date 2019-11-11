import {
  SwipeCardResult,
  ScheduleChangeType,
  EquipmentType,
  RoleType,
} from './constant-manager';

export interface DatePeriodRangeDto {
  date: Date | string;
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
  id: string;
  password: string;
  name: string;
  email: string;
}

export interface SuspendedCourseDto {
  timeRange: DatePeriodRangeDto;
  classroomID: string;
}

export interface UpdateSemesterCourseDto {
  time?: string;
  teacherID?: string;
  classroomID?: string;
}

export interface DeleteFormDto {
  email: string;
}

export interface FindAvailableEquipmentDto {
  timeRange: DatePeriodRangeDto;
  equipType: EquipmentType;
}

export interface CheckFormDto {
  isApproved: boolean;
}

export interface CheckAuthorizationDto {
  uid: string;
  classroomID: string;
}

export interface ChangeRoleDto {
  roleID: RoleType;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface LoginDto {
  userID: string;
  password: string;
}

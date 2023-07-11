import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon";
import { SvgProps } from "react-native-svg";

export interface Screen {
  name: ScreenName;
  label: string;
  title: string;
  icon: IconSource;
  right?: (props: { color: string }) => React.ReactNode;
  component: React.ComponentType<any>;
}

export type ScreenName =
  | "overview"
  | "agenda"
  | "timetable"
  | "calendar"
  | "grades"
  | "Courses"
  | "HAS"
  | "MessMenu";

export type CustomSvgProps = {
  svgProps?: SvgProps;
  style?: StyleProp<ViewStyle>;
};

export type EventSubtask = {
  title: string;
  completed: boolean;
};

export type CustomEvent = {
  title: string;
  subtasks: Array<EventSubtask>;
  completed: boolean;
  date: Date;
  remainder?: Date;
  note?: string;
};

export type Day =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type UniOfficeHours = {
  day: Day;
  time: Date;
};

export type UniTeacher = {
  name: string;
  surname?: string;
  phone?: string;
  mail: string;
  address?: string;
  office_hours?: UniOfficeHours;
  website?: string;
};

export type UniTerm = {
  title: string;
  start_date: string;
  end_date: string;
};

export type UniClass = {
  name: string;
  color?: string;
  room?: string;
  teacher_name?: string;
  term_title?: string;
};

export class Time {
  private static _pattern = /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})\.[0-9]{3}$/;

  hours: string;
  minutes: string;
  seconds: string;

  constructor(time_string: string) {
    let parsedTime = Time.parseTimeString(time_string);
    if (parsedTime == null)
      throw new Error(`${time_string} can't be parsed into Time`);
    this.hours = parsedTime.hours;
    this.minutes = parsedTime.minutes;
    this.seconds = parsedTime.seconds;
  }

  static validateTimeString(time_string: string): boolean {
    let res = this._pattern.exec(time_string);
    if (res == null || res.length == 0) return false;
    else {
      return res[0].match(this._pattern)?.slice(1).length === 3;
    }
  }

  static parseTimeString(time_string: string) {
    if (!this.validateTimeString(time_string)) {
      return null;
    }
    let res = this._pattern.exec(time_string);
    let r = res?.[0].match(this._pattern)?.slice(1) as Array<string>;
    return {
      hours: r[0],
      minutes: r[1],
      seconds: r[2],
    };
  }

  toString() {
    return `${this.hours}${this.minutes}`;
  }
}

export type TimetableTimeSlot = { from: Time; to: Time };

export type TimetableClass = { class: UniClass; timeSlot: TimetableTimeSlot };

export type TimetableDay = { day: Day; classes: Array<TimetableClass> };

export type Timetable = { days: Array<TimetableDay> };


export interface AppData {
  Student_ID: string;
  Course_ID: string;
  Semester_ID: string;
  Faculty_ID: string;
  grade: string;
  Attendance: string;
}
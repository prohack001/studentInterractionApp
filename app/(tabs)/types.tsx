export type ClassType = {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    timeDisplay: string;
    backgroundColor: string;
  };
  
  export type RootStackParamList = {
    Notifications: undefined;
    Schedule: undefined;
    ClassDetail: { classInfo: ClassType };
  };
import { EquipmentType } from '../../../lib';

export const PERIOD_OPTIONS = [
  { value: '0', title: '0　(07: 10~08: 00)' },
  { value: '1', title: '1　(08: 10~09: 00)' },
  { value: '2', title: '2　(09: 10~10: 00)' },
  { value: '3', title: '3　(10: 10~11: 00)' },
  { value: '4', title: '4　(11: 10~12: 00)' },
  { value: 'N', title: 'N　(12: 10~13: 00)' },
  { value: '5', title: '5　(13: 10~14: 00)' },
  { value: '6', title: '6　(14: 10~15: 00)' },
  { value: '7', title: '7　(15: 10~16: 00)' },
  { value: '8', title: '8　(16: 10~17: 00)' },
  { value: '9', title: '9　(17: 10~18: 00)' },
  { value: 'A', title: 'A　(18: 10~19: 00)' },
  { value: 'B', title: 'B　(19: 10~20: 00)' },
  { value: 'C', title: 'C　(20: 10~21: 00)' },
  { value: 'D', title: 'D　(21: 10~22: 00)' },
  { value: 'E', title: 'E　(22: 10~23: 00)' },
];

export const CLASSROOM_OPTIONS = [
  { value: '61101', title: '61101' },
  { value: '61102', title: '61102' },
  { value: '61103', title: '61103' },
  { value: '61104', title: '61104' },
  { value: '61200', title: '61200(大階梯講堂)' },
  { value: '61201', title: '61201' },
  { value: '61202', title: '61202' },
  { value: '61204', title: '61204' },
  { value: '61206', title: '61206(多功能講堂)' },
  { value: '61208', title: '61208' },
  { value: '61210', title: '61210' },
  { value: '61000', title: '2F貴賓室' },
  { value: '61321', title: '61321(小會議室)' },
  { value: '61306', title: '61306(大會議室)' },
];

export const EQUIPMENT_TYPE_OPTIONS = [
  { value: EquipmentType.Projector, title: '投影機' },
  { value: EquipmentType.Microphone, title: '麥克風' },
  { value: EquipmentType.MiniMic, title: '小蜜蜂' },
  { value: EquipmentType.PresentationRemote, title: '簡報筆' },
  { value: EquipmentType.ProjectionScreen, title: '投影幕' },
  { value: EquipmentType.ExtensionCord, title: '延長線' },
  { value: EquipmentType.Laptop, title: '筆電' },
];

export const WEEK = [
  { id: 'sunday', title: '日' },
  { id: 'monday', title: '一' },
  { id: 'tuesday', title: '二' },
  { id: 'wednesday', title: '三' },
  { id: 'thursday', title: '四' },
  { id: 'friday', title: '五' },
  { id: 'saturday', title: '六' },
];

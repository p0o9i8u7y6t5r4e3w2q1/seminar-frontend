import { EquipmentType } from '../../../lib';

export const PERIOD_NAMES = {
  0: '0　(07: 10~08: 00)',
  1: '1　(08: 10~09: 00)',
  2: '2　(09: 10~10: 00)',
  3: '3　(10: 10~11: 00)',
  4: '4　(11: 10~12: 00)',
  N: 'N　(12: 10~13: 00)',
  5: '5　(13: 10~14: 00)',
  6: '6　(14: 10~15: 00)',
  7: '7　(15: 10~16: 00)',
  8: '8　(16: 10~17: 00)',
  9: '9　(17: 10~18: 00)',
  A: 'A　(18: 10~19: 00)',
  B: 'B　(19: 10~20: 00)',
  C: 'C　(20: 10~21: 00)',
  D: 'D　(21: 10~22: 00)',
  E: 'E　(22: 10~23: 00)',
};

export const PERIOD_OPTIONS = [
  { value: '0', title: PERIOD_NAMES[0] },
  { value: '1', title: PERIOD_NAMES[1] },
  { value: '2', title: PERIOD_NAMES[2] },
  { value: '3', title: PERIOD_NAMES[3] },
  { value: '4', title: PERIOD_NAMES[4] },
  { value: 'N', title: PERIOD_NAMES.N },
  { value: '5', title: PERIOD_NAMES[5] },
  { value: '6', title: PERIOD_NAMES[6] },
  { value: '7', title: PERIOD_NAMES[7] },
  { value: '8', title: PERIOD_NAMES[8] },
  { value: '9', title: PERIOD_NAMES[9] },
  { value: 'A', title: PERIOD_NAMES.A },
  { value: 'B', title: PERIOD_NAMES.B },
  { value: 'C', title: PERIOD_NAMES.C },
  { value: 'D', title: PERIOD_NAMES.D },
  { value: 'E', title: PERIOD_NAMES.E },
];

export const CLASSROOM_NAMES = {
  61101: '61101',
  61102: '61102',
  61103: '61103',
  61104: '61104',
  61200: '61200(大階梯講堂)',
  61201: '61201(電腦教室)',
  61202: '61202',
  61204: '61204',
  61206: '61206(多功能講堂)',
  61208: '61208',
  61210: '61210',
  61000: '2F貴賓室',
  61321: '61321(小會議室)',
  61306: '61306(大會議室)',
};

export const CLASSROOM_OPTIONS = [
  { value: '61101', title: CLASSROOM_NAMES[61101] },
  { value: '61102', title: CLASSROOM_NAMES[61102] },
  { value: '61103', title: CLASSROOM_NAMES[61103] },
  { value: '61104', title: CLASSROOM_NAMES[61104] },
  { value: '61200', title: CLASSROOM_NAMES[61200] },
  { value: '61201', title: CLASSROOM_NAMES[61201] },
  { value: '61202', title: CLASSROOM_NAMES[61202] },
  { value: '61204', title: CLASSROOM_NAMES[61204] },
  { value: '61206', title: CLASSROOM_NAMES[61206] },
  { value: '61208', title: CLASSROOM_NAMES[61208] },
  { value: '61210', title: CLASSROOM_NAMES[61210] },
  { value: '61000', title: CLASSROOM_NAMES[61000] },
  { value: '61321', title: CLASSROOM_NAMES[61321] },
  { value: '61306', title: CLASSROOM_NAMES[61306] },
];

export const EQUIPMENT_TYPE_NAMES = {
  [EquipmentType.Projector]: '投影機',
  [EquipmentType.Microphone]: '麥克風',
  [EquipmentType.MiniMic]: '小蜜蜂',
  [EquipmentType.PresentationRemote]: '簡報筆',
  [EquipmentType.ProjectionScreen]: '投影幕',
  [EquipmentType.ExtensionCord]: '延長線',
  [EquipmentType.Laptop]: '筆電',
};

export const EQUIPMENT_TYPE_OPTIONS = [
  { value: EquipmentType.Projector, title: '投影機' },
  { value: EquipmentType.Microphone, title: '麥克風' },
  { value: EquipmentType.MiniMic, title: '小蜜蜂' },
  { value: EquipmentType.PresentationRemote, title: '簡報筆' },
  { value: EquipmentType.ProjectionScreen, title: '投影幕' },
  { value: EquipmentType.ExtensionCord, title: '延長線' },
  { value: EquipmentType.Laptop, title: '筆電' },
];

/*
export const WEEK = [
  { id: 'sunday', title: '日' },
  { id: 'monday', title: '一' },
  { id: 'tuesday', title: '二' },
  { id: 'wednesday', title: '三' },
  { id: 'thursday', title: '四' },
  { id: 'friday', title: '五' },
  { id: 'saturday', title: '六' },
];
 */

export const WEEK = [
  { id: 0, title: '日' },
  { id: 1, title: '一' },
  { id: 2, title: '二' },
  { id: 3, title: '三' },
  { id: 4, title: '四' },
  { id: 5, title: '五' },
  { id: 6, title: '六' },
];

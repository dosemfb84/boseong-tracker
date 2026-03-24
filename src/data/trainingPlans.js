// run_key format: {userId}_w{week}_{dayAbbrev}
// e.g. andrew_w1_mon, jimmy_w3_sat

export const USERS = {
  andrew: {
    id: 'andrew',
    name: 'Andrew',
    unit: 'km',
    // Bald, beard with white/gray chin
    avatar: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=andrew&hair[]=bald&facialHair[]=beardMustache&facialHairColor[]=c8c8c8&facialHairProbability=100&backgroundColor=fed7aa',
    avatarBg: 'bg-orange-100',
  },
  jimmy: {
    id: 'jimmy',
    name: 'Jimmy',
    unit: 'mi',
    // Bald, ginger stubble
    avatar: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=jimmy&hair[]=bald&facialHair[]=shadow&facialHairColor[]=c44b11&facialHairProbability=100&backgroundColor=bfdbfe',
    avatarBg: 'bg-blue-100',
  },
}

const RACE_DATE = '2026-05-02'

function makeRun(userId, week, dayAbbrev, date, day, type, description, distanceNum) {
  return {
    key: `${userId}_w${week}_${dayAbbrev}`,
    userId,
    week,
    day,
    date,         // display e.g. "Mar 23"
    dateISO: date, // will be overwritten below
    type,
    description,
    distanceNum,
  }
}

// Helper to format display date
function fmt(isoDate) {
  const d = new Date(isoDate + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function run(userId, week, dayAbbrev, isoDate, day, type, description, distanceNum) {
  return {
    key: `${userId}_w${week}_${dayAbbrev}`,
    userId,
    week,
    day,
    date: fmt(isoDate),
    dateISO: isoDate,
    type,
    description,
    distanceNum,
  }
}

export const ANDREW_PLAN = [
  // Week 1
  { weekNum: 1, weekLabel: 'March 23 – 29', total: 113, unit: 'km', runs: [
    run('andrew',1,'mon','2026-03-23','Monday',   'workout', '3KM UP / 15×400M @ 3:30/KM + 5 Hill Repeats / 3KM CD', 14),
    run('andrew',1,'tue','2026-03-24','Tuesday',  'easy',    'Easy 15km', 15),
    run('andrew',1,'wed','2026-03-25','Wednesday','easy',    'Easy 15km', 15),
    run('andrew',1,'thu','2026-03-26','Thursday', 'easy',    'Easy 15km', 15),
    run('andrew',1,'fri','2026-03-27','Friday',   'workout', '3KM UP / 9KM Steady @ 4:15/KM / 3KM CD', 15),
    run('andrew',1,'sat','2026-03-28','Saturday', 'long',    'Long Run: 21KM Easy (4:40/KM) + 5KM @ 3:55/KM', 26),
    run('andrew',1,'sun','2026-03-29','Sunday',   'easy',    'Easy 15km', 15),
  ]},
  // Week 2
  { weekNum: 2, weekLabel: 'March 30 – April 5', total: 121, unit: 'km', runs: [
    run('andrew',2,'mon','2026-03-30','Monday',   'easy',    'Easy 15km', 15),
    run('andrew',2,'tue','2026-03-31','Tuesday',  'workout', '3KM UP / 1×10KM @ 3:40–3:50/KM / 3KM CD', 16),
    run('andrew',2,'wed','2026-04-01','Wednesday','easy',    'Easy 15km', 15),
    run('andrew',2,'thu','2026-04-02','Thursday', 'easy',    'Easy 15km', 15),
    run('andrew',2,'fri','2026-04-03','Friday',   'workout', '3KM UP / 9KM Progressive (4:20→3:55/KM) / 3KM CD', 15),
    run('andrew',2,'sat','2026-04-04','Saturday', 'long',    'Long Run: 10KM Easy + 10KM @ 3:55/KM + 10KM Easy', 30),
    run('andrew',2,'sun','2026-04-05','Sunday',   'easy',    'Easy 15km', 15),
  ]},
  // Week 3
  { weekNum: 3, weekLabel: 'April 6 – 12', total: 122, unit: 'km', runs: [
    run('andrew',3,'mon','2026-04-06','Monday',   'workout', '3KM UP / 15×400M @ 3:30/KM + 5 Hill Repeats / 3KM CD', 14),
    run('andrew',3,'tue','2026-04-07','Tuesday',  'easy',    'Easy 15km', 15),
    run('andrew',3,'wed','2026-04-08','Wednesday','easy',    'Easy 15km', 15),
    run('andrew',3,'thu','2026-04-09','Thursday', 'easy',    'Easy 15km', 15),
    run('andrew',3,'fri','2026-04-10','Friday',   'workout', '3KM UP / 3×3KM @ 4:05/KM (1\' rest) / 3KM CD', 15),
    run('andrew',3,'sat','2026-04-11','Saturday', 'long',    'Long Run: 10KM Easy + 15KM @ 3:55/KM + 10KM Easy', 35),
    run('andrew',3,'sun','2026-04-12','Sunday',   'easy',    'Easy 15km', 15),
  ]},
  // Week 4
  { weekNum: 4, weekLabel: 'April 13 – 19', total: 121, unit: 'km', runs: [
    run('andrew',4,'mon','2026-04-13','Monday',   'easy',    'Easy 15km', 15),
    run('andrew',4,'tue','2026-04-14','Tuesday',  'workout', '3KM UP / 5×2KM @ 3:40–3:50/KM / 3KM CD', 16),
    run('andrew',4,'wed','2026-04-15','Wednesday','easy',    'Easy 15km', 15),
    run('andrew',4,'thu','2026-04-16','Thursday', 'easy',    'Easy 15km', 15),
    run('andrew',4,'fri','2026-04-17','Friday',   'workout', '3KM UP / 9KM Tempo @ 4:05/KM / 3KM CD', 15),
    run('andrew',4,'sat','2026-04-18','Saturday', 'long',    'Long Run: 10KM Easy + 10KM @ 3:55/KM + 10KM Easy', 30),
    run('andrew',4,'sun','2026-04-19','Sunday',   'easy',    'Easy 15km', 15),
  ]},
  // Week 5
  { weekNum: 5, weekLabel: 'April 20 – 26', total: 116, unit: 'km', runs: [
    run('andrew',5,'mon','2026-04-20','Monday',   'easy',    'Easy 15km', 15),
    run('andrew',5,'tue','2026-04-21','Tuesday',  'workout', '3KM UP / 3×3KM @ Marathon Pace / 3KM CD', 15),
    run('andrew',5,'wed','2026-04-22','Wednesday','easy',    'Easy 15km', 15),
    run('andrew',5,'thu','2026-04-23','Thursday', 'easy',    'Easy 15km', 15),
    run('andrew',5,'fri','2026-04-24','Friday',   'workout', '3KM UP / 9KM Steady @ 4:10/KM / 3KM CD', 15),
    run('andrew',5,'sat','2026-04-25','Saturday', 'long',    'Long Run: 21KM Easy (4:40/KM) + 5KM @ 3:55/KM', 26),
    run('andrew',5,'sun','2026-04-26','Sunday',   'easy',    'Easy 15km', 15),
  ]},
  // Week 6
  { weekNum: 6, weekLabel: 'April 27 – May 3', total: 82.2, unit: 'km', runs: [
    run('andrew',6,'mon','2026-04-27','Monday',   'easy',    'Easy 15km', 15),
    run('andrew',6,'tue','2026-04-28','Tuesday',  'easy',    'Easy 10km', 10),
    run('andrew',6,'wed','2026-04-29','Wednesday','easy',    'Easy 10km', 10),
    run('andrew',6,'thu','2026-04-30','Thursday', 'easy',    'Easy 5km', 5),
    run('andrew',6,'fri','2026-05-01','Friday',   'rest',    'Rest', 0),
    run('andrew',6,'sat','2026-05-02','Saturday', 'race',    'Race Day! Boseong Marathon', 42.2),
    run('andrew',6,'sun','2026-05-03','Sunday',   'rest',    'Recovery', 0),
  ]},
]

export const JIMMY_PLAN = [
  // Week 1 — Rebuild / Ease In (~40–45 mi)
  { weekNum: 1, weekLabel: 'March 23 – 29', total: 52, unit: 'mi', runs: [
    run('jimmy',1,'mon','2026-03-23','Monday',   'easy',    'Easy 5 miles', 5),
    run('jimmy',1,'tue','2026-03-24','Tuesday',  'workout', '2mi WU / 3×2mi (light threshold) / 2mi CD', 10),
    run('jimmy',1,'wed','2026-03-25','Wednesday','easy',    'Easy 7 miles', 7),
    run('jimmy',1,'thu','2026-03-26','Thursday', 'easy',    'Medium-long 11 miles', 11),
    run('jimmy',1,'fri','2026-03-27','Friday',   'rest',    'Rest', 0),
    run('jimmy',1,'sat','2026-03-28','Saturday', 'easy',    'Easy 6 miles', 6),
    run('jimmy',1,'sun','2026-03-29','Sunday',   'long',    'Easy 13 miles', 13),
  ]},
  // Week 2 — Build (~50–55 mi)
  { weekNum: 2, weekLabel: 'March 30 – April 5', total: 55, unit: 'mi', runs: [
    run('jimmy',2,'mon','2026-03-30','Monday',   'easy',    'Easy 5 miles', 5),
    run('jimmy',2,'tue','2026-03-31','Tuesday',  'workout', '2mi WU / 4×1.5mi threshold / 2mi CD', 10),
    run('jimmy',2,'wed','2026-04-01','Wednesday','easy',    'Easy 5 miles', 5),
    run('jimmy',2,'thu','2026-04-02','Thursday', 'easy',    'Easy 13 miles', 13),
    run('jimmy',2,'fri','2026-04-03','Friday',   'rest',    'Rest', 0),
    run('jimmy',2,'sat','2026-04-04','Saturday', 'easy',    'Easy 5 miles', 5),
    run('jimmy',2,'sun','2026-04-05','Sunday',   'long',    '17 miles w/ last 6 @ MP (~7:00–7:05)', 17),
  ]},
  // Week 3 — Peak Week (~55–60 mi)
  { weekNum: 3, weekLabel: 'April 6 – 12', total: 59, unit: 'mi', runs: [
    run('jimmy',3,'mon','2026-04-06','Monday',   'easy',    'Easy 6 miles', 6),
    run('jimmy',3,'tue','2026-04-07','Tuesday',  'workout', '2mi WU / 5×1mi threshold / 2mi CD', 9),
    run('jimmy',3,'wed','2026-04-08','Wednesday','easy',    'Easy 6 miles', 6),
    run('jimmy',3,'thu','2026-04-09','Thursday', 'easy',    '13 miles w/ last 3 steady', 13),
    run('jimmy',3,'fri','2026-04-10','Friday',   'rest',    'Rest', 0),
    run('jimmy',3,'sat','2026-04-11','Saturday', 'easy',    'Easy 5 miles', 5),
    run('jimmy',3,'sun','2026-04-12','Sunday',   'long',    '20 miles w/ 9 @ MP (~6:55–7:00 effort)', 20),
  ]},
  // Week 4 — Absorb (~45–50 mi)
  { weekNum: 4, weekLabel: 'April 13 – 19', total: 51, unit: 'mi', runs: [
    run('jimmy',4,'mon','2026-04-13','Monday',   'easy',    'Easy 5 miles', 5),
    run('jimmy',4,'tue','2026-04-14','Tuesday',  'workout', '2mi WU / 3×2mi (controlled) / 2mi CD', 10),
    run('jimmy',4,'wed','2026-04-15','Wednesday','easy',    'Easy 5 miles', 5),
    run('jimmy',4,'thu','2026-04-16','Thursday', 'easy',    'Easy 11 miles', 11),
    run('jimmy',4,'fri','2026-04-17','Friday',   'rest',    'Rest', 0),
    run('jimmy',4,'sat','2026-04-18','Saturday', 'easy',    'Easy 5 miles', 5),
    run('jimmy',4,'sun','2026-04-19','Sunday',   'long',    '15 miles w/ 4–5 @ MP', 15),
  ]},
  // Week 5 — Taper Begins (~40–45 mi)
  { weekNum: 5, weekLabel: 'April 20 – 26', total: 47, unit: 'mi', runs: [
    run('jimmy',5,'mon','2026-04-20','Monday',   'easy',    'Easy 5 miles', 5),
    run('jimmy',5,'tue','2026-04-21','Tuesday',  'workout', '2mi WU / 4×1mi (light, not hard) / 2mi CD', 8),
    run('jimmy',5,'wed','2026-04-22','Wednesday','easy',    'Easy 5 miles', 5),
    run('jimmy',5,'thu','2026-04-23','Thursday', 'easy',    'Easy 11 miles', 11),
    run('jimmy',5,'fri','2026-04-24','Friday',   'rest',    'Rest', 0),
    run('jimmy',5,'sat','2026-04-25','Saturday', 'easy',    'Easy 5 miles', 5),
    run('jimmy',5,'sun','2026-04-26','Sunday',   'long',    'Easy 13 miles (2–3 miles @ MP if feeling good)', 13),
  ]},
  // Week 6 — Race Week (~25–30 mi + race)
  { weekNum: 6, weekLabel: 'April 27 – May 3', total: 49.2, unit: 'mi', runs: [
    run('jimmy',6,'mon','2026-04-27','Monday',   'easy',    'Easy 5 miles', 5),
    run('jimmy',6,'tue','2026-04-28','Tuesday',  'workout', '2mi WU / 3×1mi @ MP / 2mi CD', 7),
    run('jimmy',6,'wed','2026-04-29','Wednesday','easy',    'Easy 4 miles', 4),
    run('jimmy',6,'thu','2026-04-30','Thursday', 'easy',    'Easy 7 miles', 7),
    run('jimmy',6,'fri','2026-05-01','Friday',   'rest',    'Rest', 0),
    run('jimmy',6,'sat','2026-05-02','Saturday', 'race',    'Race Day! Boseong Marathon', 26.2),
    run('jimmy',6,'sun','2026-05-03','Sunday',   'rest',    'Recovery', 0),
  ]},
]

export const PLANS = { andrew: ANDREW_PLAN, jimmy: JIMMY_PLAN }

export const PLAN_START = '2026-03-23'
export const RACE_DATE_ISO = RACE_DATE

/** Returns flat array of all runs for a user */
export function getAllRuns(userId) {
  return PLANS[userId].flatMap(w => w.runs)
}

/** Returns the week object (1–6) for a given date */
export function getCurrentWeekNum() {
  const start = new Date('2026-03-23T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = today - start
  const weekNum = Math.ceil((diff / (1000 * 60 * 60 * 24) + 1) / 7)
  return Math.min(Math.max(weekNum, 1), 6)
}

/** Returns days until race day */
export function getDaysToRace() {
  const race = new Date('2026-05-02T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.ceil((race - today) / (1000 * 60 * 60 * 24))
  return Math.max(diff, 0)
}

/** Returns "Today", "Tomorrow", day name (within 7 days), or date string */
export function friendlyDate(isoDate) {
  const target = new Date(isoDate + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff > 1 && diff < 7) return target.toLocaleDateString('en-US', { weekday: 'long' })
  return fmt(isoDate)
}

export const TYPE_CONFIG = {
  easy:    { label: 'Easy Run',  colorClass: 'text-blue-500',   bgClass: 'bg-blue-500/10',   icon: 'Wind'   },
  workout: { label: 'Workout',   colorClass: 'text-orange-500', bgClass: 'bg-orange-500/10', icon: 'Zap'    },
  long:    { label: 'Long Run',  colorClass: 'text-red-500',    bgClass: 'bg-red-500/10',    icon: 'Flame'  },
  rest:    { label: 'Rest Day',  colorClass: 'text-gray-400',   bgClass: 'bg-gray-100',      icon: 'Coffee' },
  race:    { label: 'Race Day',  colorClass: 'text-yellow-500', bgClass: 'bg-yellow-500/10', icon: 'Trophy' },
}

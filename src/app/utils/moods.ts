export type Mood = {
  id: string;
  label: string;
  emoji: string;
  color: string;
};

export const MOODS: Record<string, Mood> = {
  GREAT: {
    id: "great",
    label: "Great",
    emoji: "🤗",
    color: "green",
  },
  GOOD: {
    id: "good",
    label: "Good",
    emoji: "😌",
    color: "blue",
  },
  OK: {
    id: "ok",
    label: "Ok",
    emoji: "😐",
    color: "yello",
  },
  NOTGREAT: {
    id: "notGreat",
    label: "NotGreat",
    emoji: "😢",
    color: "orange",
  },
  BAD: {
    id: "bad",
    label: "Bad",
    emoji: "😠",
    color: "red",
  },
};

export const getMoodById = (moodId: string) => {
  return MOODS[moodId?.toUpperCase()];
};

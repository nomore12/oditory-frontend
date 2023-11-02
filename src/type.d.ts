export type MemoryProblemData = {
  id: number;
  problem: {
    id: number;
    sound_item: {
      sound: string;
      sound_url: string;
      problem: number;
      created_at: string;
    };
    type: string;
    level: number;
    question_number: number;
  };
  choice_count: number;
  answer_count: number;
  syllable_count: number;
  has_response_delay: boolean;
  response_delay: number;
  choices: AnswerItem[];
  answers: AnswerItem[];
};

export type AnswerItem = {
  pk: number;
  image: string;
  created_at: string;
  item_name: string;
  syllable_count: number;
  category: string;
};

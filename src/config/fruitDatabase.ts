import { Fruit } from '../types/fruit';

export const FRUITS: Fruit[] = [
  {
    id: 'apple',
    name: 'Apple',
    emoji: '🍎',
    avgSweetness: 70,
    aliases: ['apple', 'red apple', 'green apple', 'malus']
  },
  {
    id: 'banana',
    name: 'Banana',
    emoji: '🍌',
    avgSweetness: 75,
    aliases: ['banana', 'plantain']
  },
  {
    id: 'orange',
    name: 'Orange',
    emoji: '🍊',
    avgSweetness: 70,
    aliases: ['orange', 'citrus', 'mandarin']
  },
  {
    id: 'grape',
    name: 'Grape',
    emoji: '🍇',
    avgSweetness: 85,
    aliases: ['grape', 'grapes', 'vine fruit']
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    emoji: '🍓',
    avgSweetness: 65,
    aliases: ['strawberry', 'berry']
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    emoji: '🍉',
    avgSweetness: 65,
    aliases: ['watermelon', 'melon']
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    emoji: '🍍',
    avgSweetness: 75,
    aliases: ['pineapple', 'ananas']
  },
  {
    id: 'mango',
    name: 'Mango',
    emoji: '🥭',
    avgSweetness: 85,
    aliases: ['mango', 'tropical fruit']
  },
  {
    id: 'kiwi',
    name: 'Kiwi',
    emoji: '🥝',
    avgSweetness: 60,
    aliases: ['kiwi', 'kiwifruit', 'chinese gooseberry']
  },
  {
    id: 'peach',
    name: 'Peach',
    emoji: '🍑',
    avgSweetness: 75,
    aliases: ['peach', 'nectarine']
  },
  {
    id: 'pear',
    name: 'Pear',
    emoji: '🍐',
    avgSweetness: 70,
    aliases: ['pear', 'asian pear']
  },
  {
    id: 'cherry',
    name: 'Cherry',
    emoji: '🍒',
    avgSweetness: 80,
    aliases: ['cherry', 'cherries']
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    emoji: '🫐',
    avgSweetness: 60,
    aliases: ['blueberry', 'blueberries', 'berry']
  },
  {
    id: 'lemon',
    name: 'Lemon',
    emoji: '🍋',
    avgSweetness: 20,
    aliases: ['lemon', 'citrus']
  },
  {
    id: 'lime',
    name: 'Lime',
    emoji: '🍋‍🟩',
    avgSweetness: 15,
    aliases: ['lime', 'citrus']
  },
  {
    id: 'coconut',
    name: 'Coconut',
    emoji: '🥥',
    avgSweetness: 50,
    aliases: ['coconut', 'coco']
  },
  {
    id: 'avocado',
    name: 'Avocado',
    emoji: '🥑',
    avgSweetness: 10,
    aliases: ['avocado']
  },
  {
    id: 'tomato',
    name: 'Tomato',
    emoji: '🍅',
    avgSweetness: 40,
    aliases: ['tomato', 'tomatoes']
  }
];

export function getFruitByName(name: string): Fruit | undefined {
  const searchName = name.toLowerCase();
  return FRUITS.find(fruit =>
    fruit.id === searchName ||
    fruit.name.toLowerCase() === searchName ||
    fruit.aliases.some(alias => alias.toLowerCase().includes(searchName))
  );
}

export function getSweetnessEmoji(score: number): string {
  if (score <= 20) return '😞';
  if (score <= 40) return '😐';
  if (score <= 60) return '🙂';
  if (score <= 80) return '😋';
  return '🤩';
}

export function getSweetnessLabel(score: number): string {
  if (score <= 20) return 'Not Sweet';
  if (score <= 40) return 'Slightly Sweet';
  if (score <= 60) return 'Moderately Sweet';
  if (score <= 80) return 'Sweet';
  return 'Very Sweet';
}

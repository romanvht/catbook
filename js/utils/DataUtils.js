export class DataUtils {
  static formatLifeSpan(lifeSpan) {
    if (!lifeSpan) return 'Не указано';
    return `${lifeSpan} лет`;
  }

  static formatWeight(weight) {
    if (!weight || !weight.metric) return 'Не указано';
    return `${weight.metric} кг`;
  }

  static formatHypoallergenic(hypoallergenic) {
    return hypoallergenic === 1 ? 'Да' : 'Нет';
  }

  static formatError(error) {
    const errorMessages = {
      403: 'Недостаточно прав доступа. Проверьте ваш API ключ.',
      404: 'Данные не найдены.',
      429: 'Слишком много запросов. Попробуйте позже.',
      500: 'Ошибка сервера. Попробуйте позже.',
      'Network Error': 'Ошибка сети. Проверьте интернет соединение.'
    };

    if (error.message && errorMessages[error.message]) {
      return errorMessages[error.message];
    }

    if (error.status && errorMessages[error.status]) {
      return errorMessages[error.status];
    }

    return 'Произошла неизвестная ошибка. Попробуйте позже.';
  }

  static normalizeBreedData(breed) {
    return {
      id: breed.id,
      name: DataUtils.getBreedName(breed.name) || 'Неизвестная порода',
      description: breed.description || 'Описание не доступно',
      origin: breed.origin || 'Неизвестно',
      life_span: breed.life_span || '',
      weight: breed.weight || {},
      temperament: DataUtils.translateTemperament(breed.temperament) || '',
      wikipedia_url: breed.wikipedia_url || '',
      image: breed.image || null,
      energy_level: breed.energy_level || 0,
      affection_level: breed.affection_level || 0,
      intelligence: breed.intelligence || 0,
      social_needs: breed.social_needs || 0,
      child_friendly: breed.child_friendly || 0,
      adaptability: breed.adaptability || 0,
      cat_friendly: breed.cat_friendly || 0,
      dog_friendly: breed.dog_friendly || 0,
      grooming: breed.grooming || 0,
      health_issues: breed.health_issues || 0,
      shedding_level: breed.shedding_level || 0,
      stranger_friendly: breed.stranger_friendly || 0,
      vocalisation: breed.vocalisation || 0,
      bidability: breed.bidability || 0,
      hypoallergenic: breed.hypoallergenic || 0
    };
  }

  static getCharacteristicName(key) {
    const names = {
      adaptability: 'Адаптивность',
      affection_level: 'Ласковость',
      child_friendly: 'Дружелюбие к детям',
      cat_friendly: 'Дружелюбие к кошкам',
      dog_friendly: 'Дружелюбие к собакам',
      energy_level: 'Энергичность',
      grooming: 'Сложности в уходе',
      health_issues: 'Проблемы со здоровьем',
      intelligence: 'Интеллект',
      shedding_level: 'Линька',
      social_needs: 'Социальные потребности',
      stranger_friendly: 'Дружелюбие к незнакомцам',
      vocalisation: 'Любитель поорать',
      bidability: 'Послушность'
    };
    return names[key] || key;
  }

  static getBreedName(key) {
    const names = {
      'Abyssinian': 'Абиссинская',
      'Aegean': 'Эгейская',
      'American Bobtail': 'Американский бобтейл',
      'American Curl': 'Американский керл',
      'American Shorthair': 'Американская короткошёрстная',
      'American Wirehair': 'Американская жесткошёрстная',
      'Arabian Mau': 'Аравийский мау',
      'Australian Mist': 'Австралийский туман',
      'Balinese': 'Балинезийская',
      'Bambino': 'Бамбино',
      'Bengal': 'Бенгальская',
      'Birman': 'Бирманская',
      'Bombay': 'Бомбейская',
      'British Longhair': 'Британская длинношёрстная',
      'British Shorthair': 'Британская короткошёрстная',
      'Burmese': 'Бурманская',
      'Burmilla': 'Бурмилла',
      'California Spangled': 'Калифорнийская пятнистая',
      'Chantilly-Tiffany': 'Шантильи-тиффани',
      'Chartreux': 'Шартрё',
      'Chausie': 'Чаузи',
      'Cheetoh': 'Чито',
      'Colorpoint Shorthair': 'Колорпойнт короткошёрстная',
      'Cornish Rex': 'Корниш-рекс',
      'Cymric': 'Кимрик',
      'Cyprus': 'Кипрская',
      'Devon Rex': 'Девон-рекс',
      'Donskoy': 'Донской сфинкс',
      'Dragon Li': 'Дракон Ли',
      'Egyptian Mau': 'Египетская мау',
      'European Burmese': 'Европейская бурманская',
      'Exotic Shorthair': 'Экзотическая короткошёрстная',
      'Havana Brown': 'Гавана браун',
      'Himalayan': 'Гималайская',
      'Japanese Bobtail': 'Японский бобтейл',
      'Javanese': 'Яванская',
      'Khao Manee': 'Као мани',
      'Korat': 'Корат',
      'Kurilian': 'Курильский бобтейл',
      'LaPerm': 'ЛаПерм',
      'Maine Coon': 'Мейн-кун',
      'Malayan': 'Малайская',
      'Manx': 'Мэнкс',
      'Munchkin': 'Манчкин',
      'Nebelung': 'Нибелунг',
      'Norwegian Forest Cat': 'Норвежская лесная',
      'Ocicat': 'Оцикет',
      'Oriental': 'Ориентальная',
      'Persian': 'Персидская',
      'Pixie-bob': 'Пикси-боб',
      'Ragamuffin': 'Рэгамаффин',
      'Ragdoll': 'Рэгдолл',
      'Russian Blue': 'Русская голубая',
      'Savannah': 'Саванна',
      'Scottish Fold': 'Шотландская вислоухая',
      'Selkirk Rex': 'Селкирк-рекс',
      'Siamese': 'Сиамская',
      'Siberian': 'Сибирская',
      'Singapura': 'Сингапура',
      'Snowshoe': 'Сноу-шу',
      'Somali': 'Сомалийская',
      'Sphynx': 'Сфинкс',
      'Tonkinese': 'Тонкинская',
      'Toyger': 'Тойгер',
      'Turkish Angora': 'Турецкая ангора',
      'Turkish Van': 'Турецкий ван',
      'York Chocolate': 'Йорк шоколадная'
    };
    return names[key] || key;
  }

  static getTemperamentName(key) {
    const names = {
      'Active': 'Активный',
      'Energetic': 'Энергичный',
      'Independent': 'Независимый',
      'Intelligent': 'Умный',
      'Gentle': 'Нежный',
      'Affectionate': 'Ласковый',
      'Social': 'Общительный',
      'Playful': 'Игривый',
      'Interactive': 'Контактный',
      'Lively': 'Живой',
      'Sensitive': 'Чувствительный',
      'Curious': 'Любопытный',
      'Easy Going': 'Спокойный',
      'Calm': 'Спокойный',
      'Loyal': 'Преданный',
      'Sensible': 'Разумный',
      'Agile': 'Проворный',
      'Fun-loving': 'Веселый',
      'Relaxed': 'Расслабленный',
      'Friendly': 'Дружелюбный',
      'Alert': 'Бдительный',
      'Demanding': 'Требовательный',
      'Dependent': 'Зависимый',
      'Patient': 'Терпеливый',
      'calm': 'Спокойный',
      'Highly interactive': 'Очень контактный',
      'Mischievous': 'Озорной',
      'affectionate': 'Ласковый',
      'loyal': 'Преданный',
      'social': 'Общительный',
      'Loving': 'Любящий',
      'Sweet': 'Милый',
      'Quiet': 'Тихий',
      'Peaceful': 'Мирный',
      'Clever': 'Сообразительный',
      'Devoted': 'Преданный',
      'Talkative': 'Разговорчивый',
      'Warm': 'Теплый',
      'highly intelligent': 'Очень умный',
      'Expressive': 'Выразительный',
      'Trainable': 'Обучаемый',
      'clever': 'Сообразительный',
      'inquisitive': 'Пытливый',
      'sociable': 'Общительный',
      'playful': 'Игривый',
      'trainable': 'Обучаемый',
      'Adaptable': 'Адаптивный',
      'Shy': 'Застенчивый',
      'Sedate': 'Степенный',
      'Easygoing': 'Беззаботный',
      'Outgoing': 'Общительный',
      'Adventurous': 'Авантюрный',
      'Sociable': 'Общительный',
      'Sweet-tempered': 'Добродушный',
      'Tenacious': 'Упорный',
      'Inquisitive': 'Пытливый'
    };
    return names[key] || key;
  }

  static translateTemperament(temperamentString) {
    return temperamentString.split(',').map(temp => this.getTemperamentName(temp.trim())).join(', ');
  }

  static saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('localStorage не доступен:', e);
      return false;
    }
  }

  static loadFromStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Ошибка загрузки из localStorage:', e);
      return null;
    }
  }
}

export class DataUtils {
  static formatLifeSpan(lifeSpan) {
    if (!lifeSpan) return 'Не указано';
    return `${lifeSpan} лет`;
  }

  static formatWeight(weight) {
    if (!weight || !weight.metric) return 'Не указано';
    return `${weight.metric} кг`;
  }

  static filterBreeds(breeds, searchTerm) {
    if (!searchTerm) return breeds;

    const term = searchTerm.toLowerCase();
    return breeds.filter(breed =>
      breed.name.toLowerCase().includes(term) ||
      breed.origin.toLowerCase().includes(term) ||
      (breed.temperament && breed.temperament.toLowerCase().includes(term))
    );
  }

  static normalizeBreedData(breed) {
    return {
      id: breed.id,
      name: breed.name || 'Неизвестная порода',
      description: breed.description || 'Описание не доступно',
      origin: breed.origin || 'Неизвестно',
      life_span: breed.life_span || '',
      weight: breed.weight || {},
      temperament: breed.temperament || '',
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

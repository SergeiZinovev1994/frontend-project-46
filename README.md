# Difference Calculator

[![Actions Status](https://github.com/SergeiZinovev1994/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SergeiZinovev1994/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/08ca972296f84556949c/maintainability)](https://codeclimate.com/github/SergeiZinovev1994/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/08ca972296f84556949c/test_coverage)](https://codeclimate.com/github/SergeiZinovev1994/frontend-project-46/test_coverage)
[![testAndLint](https://github.com/SergeiZinovev1994/frontend-project-46/actions/workflows/testAndLint.yml/badge.svg)](https://github.com/SergeiZinovev1994/frontend-project-46/actions/workflows/testAndLint.yml)

### Описание:

Вычислитель отличий — это приложение, которое выявляет различия между двумя файлами в форматах JSON или YAML. Его можно применять как библиотеку для получения результата сравнения, а также использовать через CLI для просмотра различий.

Возможности данной утилиты:
- Поддержка различных входных форматов, таких как YAML и JSON
- Создание отчетов в форматах: plain text, stylish и JSON

##### Пример использования:
```bash
# формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

### Демонстрация:

[![asciicast](https://asciinema.org/a/708203.svg)](https://asciinema.org/a/708203)

### Установка:

```bash
make install
genDiff -h
```
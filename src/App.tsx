import React, { useState } from 'react';
import widgets from './mock-data/widgets';
import people from './mock-data/people';
import genericSearch from './utils/genericSearch';
import { SearchInput } from './components/SearchInput';
import genericSort from './utils/genericSort';
import IWidget from './interfaces/IWidget';
import ISorters from './interfaces/ISorter';
import IPerson from './interfaces/IPerson';
import { Sorters } from './components/Sorters';
import { WidgetRenderer } from './components/renderers/WidgetRenderer';
import { PeopleRenderer } from './components/renderers/PeopleRenderer';
import genericFilter from './utils/genericFilter';
import { Filters } from './components/Filters';
import IFilter from './interfaces/IFilter';

function App() {
  //const query = '';
  const [query, setQuery] = useState<string>('');
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const buttonText = showPeople ? 'Show Widgets' : 'ShowPeople';
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<IFilter<IWidget>>
  >([]);
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<IFilter<IPerson>>
  >([]);
  const [widgetSortProperty, setWidgetSortProperty] = useState<
    ISorters<IWidget>
  >({
    property: 'title',
    isDescending: true,
  });
  const [personSortProperty, setPersonSortProperty] = useState<
    ISorters<IPerson>
  >({
    property: 'firstName',
    isDescending: true,
  });

  return (
    <>
      <button
        className='btn btn-primary'
        onClick={() => setShowPeople(!showPeople)}
      >
        {buttonText}
      </button>
      <SearchInput setSearchQuery={setQuery} />

      {!showPeople && (
        <>
          <h2>Widgets</h2>
          <Sorters
            object={widgets[0]}
            setProperty={(propertyType) => setWidgetSortProperty(propertyType)}
          ></Sorters>
          <br />
          <Filters
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={(property) => {
              const propertyMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property
              );

              const fullMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property &&
                  widgetFilterProperty.isTruthySelected ===
                    property.isTruthySelected
              );

              if (fullMatch) {
                setWidgetFilterProperties(
                  widgetFilterProperties.filter(
                    (prop) => prop.property !== property.property
                  )
                );
              } else if (propertyMatch) {
                setWidgetFilterProperties([
                  ...widgetFilterProperties.filter(
                    (prop) => prop.property !== property.property
                  ),
                  property,
                ]);
              } else {
                setWidgetFilterProperties([
                  ...widgetFilterProperties,
                  property,
                ]);
              }
            }}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ['title', 'description'], query, false)
            )
            .filter((widget) => genericFilter(widget, widgetFilterProperties))
            .sort((a, b) => genericSort(a, b, widgetSortProperty))
            .map((widget) => {
              return <WidgetRenderer {...widget} />;
            })}
        </>
      )}
      {showPeople && (
        <>
          <h2>People</h2>
          <Sorters
            object={people[0]}
            setProperty={(propertyType) => setPersonSortProperty(propertyType)}
          ></Sorters>
          <br />
          <Filters
            object={people[0]}
            properties={peopleFilterProperties}
            onChangeFilter={(property) => {
              peopleFilterProperties.includes(property)
                ? setPeopleFilterProperties(
                    peopleFilterProperties.filter((prop) => prop !== property)
                  )
                : setPeopleFilterProperties([
                    ...peopleFilterProperties,
                    property,
                  ]);
            }}
          />
          {people
            .filter((person) =>
              genericSearch(
                person,
                ['firstName', 'lastName', 'eyeColor'],
                query,
                false
              )
            )
            .filter((person) => genericFilter(person, peopleFilterProperties))
            .sort((a, b) => genericSort(a, b, personSortProperty))
            .map((person) => {
              return <PeopleRenderer {...person} />;
            })}
        </>
      )}
    </>
  );
}

export default App;

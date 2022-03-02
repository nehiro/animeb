import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';
import { connectHitsPerPage } from 'react-instantsearch-dom';
// import { classNames } from '../lib/class-names';

const classNames = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const HitsPerPage = ({
  items,
  refine,
  currentRefinement,
}: {
  items: {
    value: string;
    label: string;
  }[];
  refine: (value: number) => void;
  currentRefinement: number;
}) => {
  return (
    <Listbox value={currentRefinement} onChange={(value) => refine(value)}>
      {/* {({ open }) => (
        <div className="flex items-center space-x-2">
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            表示件数
          </Listbox.Label>
          <div className="relative w-20">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{currentRefinement}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {item.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )} */}
    </Listbox>
  );
};

const CustomHitsPerPage = connectHitsPerPage(HitsPerPage);

export default CustomHitsPerPage;

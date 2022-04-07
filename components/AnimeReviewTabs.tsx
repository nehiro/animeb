import { Tab } from '@headlessui/react';
import React from 'react';
import AnimeReviewAll from './AnimeReviewAll';
import AnimeReviewSpoilerFalse from './AnimeReviewSpoilerFalse';
import AnimeReviewSpoilerTrue from './AnimeReviewSpoilerTrue';

const AnimeReviewTabs = (props: { animeId: string }) => {
  const id = props.animeId;

  const tabNames = [
    { name: 'すべての感想・評価' },
    { name: 'ネタバレなし' },
    { name: 'ネタバレあり' },
  ];

  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex items-center justify-between">
          {tabNames.map((tabName) => {
            return (
              <Tab
                className={({ selected }) =>
                  selected
                    ? 'w-1/3 cursor-pointer bg-yellow py-4 text-center'
                    : 'w-1/3 cursor-pointer bg-lightYellow py-4 text-center'
                }
                key={tabName.name}
              >
                {tabName.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <AnimeReviewAll id={id} />
          </Tab.Panel>
          <Tab.Panel>
            <AnimeReviewSpoilerFalse id={id} />
          </Tab.Panel>
          <Tab.Panel>
            <AnimeReviewSpoilerTrue id={id} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AnimeReviewTabs;

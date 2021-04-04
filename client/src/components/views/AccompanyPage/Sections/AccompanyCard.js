import React from 'react';
import StoreCard from 'utils/StoreCard';
import InfiniteScroll from 'react-infinite-scroll-component';

function AccompanyCard(props) {
  console.log(props.select);
  const Stores = props.select;

  const renderStoreCard = Stores.map((store, index) => {
    return <StoreCard key={index} store={store} />;
  });
  return (
    <div>
      <div
        style={{
          height: 400,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <InfiniteScroll dataLength={'10'}>{renderStoreCard}</InfiniteScroll>
      </div>
    </div>
  );
}

export default AccompanyCard;

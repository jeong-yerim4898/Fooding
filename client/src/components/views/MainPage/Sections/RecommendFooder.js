import React from 'react';
import { Card, Avatar, Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';

function RecommendFooder(props) {
  const { Meta } = Card;

  return (
    <div
      style={{ width: '250px', height: '200px', margin: '2rem  auto 3.5rem' }}
    >
      <Carousel autoplay>
        {props.list.map((fooder, index) => (
          <div key={index} style={{ height: '100px', width: '150px' }}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src={fooder.img}
                  style={{ width: '250px', height: '150px' }}
                />
              }
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link
                  to={{
                    pathname: `/fooder/4`,
                    state: { username: fooder.nickname },
                  }}
                >
                  {/* <Link to={`/fooder/${fooder.id}`}> */}
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={fooder.nickname}
                    style={{ height: '50px' }}
                  />
                </Link>
                <Button
                  type="primary"
                  shape="round"
                  size={'small'}
                  style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
                >
                  팔로우
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default RecommendFooder;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageSlider from 'utils/ImageSlider';
import ReviewCard from 'utils/ReviewCard';
import StoreMenu from './Sections/StoreMenu';
import { Typography, Button } from 'antd';
import { PhoneFilled, CompassTwoTone, ProfileFilled } from '@ant-design/icons';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sections/StoreDetailPage.css';
import { StoreDetailInfo, StoreMenuInfo } from '_api/Stores';
import { fetchStoreReview } from '_api/Review';
import InfiniteScroll from 'react-infinite-scroll-component';
import Rating from '@material-ui/lab/Rating';

function StoreDetailPage(props) {
  const [Images, setImages] = useState([1, 2]);
  const { Title, Text } = Typography;
  const [StoreInfo, setStoreInfo] = useState([]);
  const storeId = props.match.params.StoreId;
  const user = useSelector(state => state.user);

  // const { StoreId } = useParams();
  // console.log(useParams());
  const [StoreLocation, setStoreLocation] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [Menus, setMenus] = useState([]);
  const { kakao } = window;
  const userid = props.user.loginSuccess.id;
  useEffect(() => {
    const StoreInfo = async () => {
      try {
        const response = await StoreDetailInfo(storeId, userid);

        setStoreInfo(response.data[0]);
        const res = await fetchStoreReview(storeId);
        setReviews(res.data);
        const ress = await StoreMenuInfo(storeId);
        console.log(ress.data);
        setMenus(ress.data);

        const container = document.getElementById('myMap');
        const options = {
          center: new kakao.maps.LatLng(
            response.data[0].lat,
            response.data[0].lng,
          ),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const imageSrc = '/images/FoodingMarker.png', // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          ),
          markerPosition = new kakao.maps.LatLng(
            response.data[0].lat,
            response.data[0].lng,
          ); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      } catch (err) {
        console.log(err);
      }
    };
    StoreInfo();
  }, []);

  const renderReviewCard = () => {
    return (
      <div>
        <Link
          to={{
            pathname: '/review/check-receipt',
            state: {
              store_id: storeId,
              user_id: user.loginSuccess.id,
            },
          }}
        >
          <Button
            shape="round"
            style={{
              margin: '5px auto',
              backgroundColor: '#F4A460',
              borderColor: '#F4A460',
              lineHeight: 'center',
            }}
            icon={
              <ProfileFilled
                style={{
                  fontSize: '20px',
                  color: 'black',
                }}
              />
            }
            size={'large'}
          >
            리뷰 작성
          </Button>
        </Link>
        <div
          style={{
            height: '220px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <InfiniteScroll
            dataLength={Reviews.length}
            style={{ height: '220px' }}
          >
            <div style={{ height: '220px' }}>
              {Reviews.map((review, index) => (
                <ReviewCard review={review}></ReviewCard>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ImageSlider images={Images} />
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            margin: '0.5rem auto',
          }}
        >
          <img
            style={{
              borderRadius: '30%',
              width: '75px',
              height: '55px',
              border: 'solid 2px #FF4500',
            }}
            src={'/images/Fooding/로고 이미지.png'}
          />
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-space',
                alignItems: 'center',
                marginLeft: '0.5em',
              }}
            >
              <Title level={4}>{StoreInfo.store_name}</Title>
              <Text style={{ marginLeft: '0.5em' }} mark>
                {StoreInfo.main_category}
              </Text>
            </div>
            <Rating
              style={{ marginLeft: '0.5em' }}
              name="read-only"
              value={StoreInfo.star}
              readOnly
            />
          </div>
          <p> 여기에 하트</p>
        </div>
        <div
          style={{
            border: 'solid 1px #FF4500',
            padding: '1rem',
            width: '90%',
            margin: '0rem auto 0.5rem',
          }}
        >
          <PhoneFilled style={{ marginRight: '1rem' }} />
          <Text>{StoreInfo.tel}</Text>
          <br />
          <CompassTwoTone style={{ marginRight: '1rem' }} />
          <Text>{StoreInfo.address}</Text>
        </div>

        <div>
          <Tabs className="myClass" fill defaultActiveKey="storeMap">
            <Tab eventKey="storeMap" title="지도">
              <div
                id="myMap"
                style={{
                  width: '300px',
                  height: '270px',
                  margin: '0.5rem auto',
                }}
              ></div>
            </Tab>
            <Tab eventKey="storeReview" title="리뷰">
              <div>{renderReviewCard()}</div>
            </Tab>
            <Tab eventKey="storeMenu" title="메뉴">
              {Menus.length > 0 ? (
                <StoreMenu Menus={Menus} />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '25%',
                  }}
                >
                  <h3>등록된 메뉴가 없습니다.</h3>
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default StoreDetailPage;

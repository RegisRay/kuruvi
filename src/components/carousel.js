import Carousel from 'react-bootstrap/Carousel';

const CarouselFadeExample = () => {
  return (
    <Carousel fade className="ms-3 mt-5">
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-4"
          src={
            'https://c4.wallpaperflare.com/wallpaper/531/951/621/digital-digital-art-artwork-illustration-minimalism-hd-wallpaper-preview.jpg'
          }
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>"Language-Agnostic"</h3>
          <p>Specialized AI to translate and transcribe languages</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-4"
          src={'https://blog.hubspot.com/hubfs/survey-bias.jpg'}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Surveyor</h3>
          <p>We make him reach everyone</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-4"
          src={
            'https://www.qualtrics.com/m/assets/wp-content/uploads/2018/03/what-is-a-survey-or-questionare.jpg'
          }
          alt="Third slide"
          style={{ height: '72vh' }}
        />

        <Carousel.Caption>
          <h3>Respondents</h3>
          <p>We break the barrier of Languages</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselFadeExample;

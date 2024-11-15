import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RightArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowForwardIosIcon className='absolute top-[40%] right-[-5px] bg-gray-300 pl-1 rounded-full cursor-pointer ' fontSize='large'  onClick={onClick}/>
  );
};


export default RightArrow;
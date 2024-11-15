import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const LeftArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowBackIosIcon className='absolute top-[40%] left-[-35px] bg-gray-300 pl-2 rounded-full cursor-pointer ' fontSize='large' onClick={onClick}/>
  );
};


export default LeftArrow;
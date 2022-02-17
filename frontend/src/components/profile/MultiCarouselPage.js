import React from 'react';
import { Grid, Button, Modal, Card, Box } from '@mui/material';
import LineChart from './LineChart';
import Piechart from './PieChart';
import { ModalStyle } from '../team/ModalStyle';
import { useEffect, useState } from 'react';
import { getMyMeetingCount, getHatLongTime } from '../../util/APIUtils';

// export defaultfunction calHour(SToH) {
//   return parseInt(SToH / 3600);
// }

export default function MultiCarouselPage(props) {

  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [hatColor, setHatColor] = useState('')
  const [durationTime,setDurationTime] = useState(0);
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [count, setCount] = useState(0);
  const [resultTime,setResultTime] = useState('');

  const hatTime = props.hatTime
  const items = [
  {
    name: "모자 별 시간",
    description: "원그래프!",
    graph: <Piechart hatTime={hatTime}></Piechart>,
  },
  {
    name: "총 회의 횟수 : n회",
    description: "꺾은선 그래프!",
    graph: LineChart(),
  },
]

//getMyMeetingCount
useEffect(() => {
  getMyMeetingCount()
  .then(response => {
    console.log(response.data)
    setCount(response.data)
  })
}, []);


//getHatLongTime

useEffect(() => {
  getHatLongTime()
  .then(response => {
    console.log(response.data)
  setHatColor(response.data.hatColor)
  setDurationTime(response.data.durationTime)
  //  const hatTime = props.hatTime

    // setLoading(false)
    // console.log(userHasMeetingList)
    // console.log(response.userHasMeetingList)
  })
}, []);

function calHour(SToH) {
  return parseInt(SToH / 3600);
}
function calMin(SToM) {
  return parseInt((SToM % 3600) / 60)
}
function calSec(SToS) {
  return parseInt((SToS % 60)%60)
}

 useEffect(() => {
  if(calSec){
    setResultTime(calHour(durationTime)+"시 "+calMin(durationTime)+"분 "+calSec(durationTime)+"초 ")
  }
 }, [calSec]);


// useEffect(() => {


//  if(durationTime>=3600){
//    setHour(Math.floor(durationTime/3600))
//    setMin((durationTime%3600).toFixed(2))
//   }else{
//     setMin((durationTime/60).toFixed(2))
//   }
// }, [durationTime]);

//setResultTime


useEffect(() => {
 
  if (hatColor === 'BLACK'){
    setImg( <img src={require('./img/모자0.png')} alt='cap'></img>)
    setDescription(
      <div> 
      <br></br>
      <div>✔  비평가 </div> 
      <br></br>
      <div>✔  판사 역할, 비판적 판단 </div>
      <br></br>
      <div>✔  적합과 부적합의 지적</div>
     </div>)
    }
  if (hatColor === 'YELLOW'){
    setImg(<img src={require('./img/모자1.png')} alt='cap'></img>)
    setDescription(
      <div> 
        <br></br>
        <div>✔ 당신은 주로 '낙관주의자' 입니다. </div> 
        <br></br>
        <div>✔ 당신은 주로 '긍정적인 사고'를 합니다. </div>
        <br></br>
        <div>✔ 당신은 주로 '타당성 검토'를 합니다.</div>
      </div>)
  }
  if (hatColor === 'RED'){
    setImg( <img src={require('./img/모자2.png')} alt='cap'></img>)
    setDescription(
      <div> 
        <br></br>
        <div>✔  직관주의자 </div> 
        <br></br>
        <div>✔  본능, 육감 </div>
        <br></br>
        <div>✔  감정대로 진행</div>
      </div>)
  }
  if (hatColor === 'GREEN'){
    setImg( <img src={require('./img/모자3.png')} alt='cap'></img>)
    setDescription(
      <div> 
        <br></br>
        <div>✔  아이디어뱅크 </div> 
        <br></br>
        <div>✔  아이디어 </div>
        <br></br>
        <div>✔  </div>
      </div>)
  }
  if (hatColor === 'BLUE'){
    setImg( <img src={require('./img/모자4.png')} alt='cap'></img>)
    setDescription(
      <div> 
        <br></br>
        <div>✔  사회자 </div> 
        <br></br>
        <div>✔  창조적 사고, 새로운 아이디어 </div>
        <br></br>
        <div>✔  가능성</div>
      </div>)
  }
  if (hatColor === 'WHITE'){
    setImg( <img src={require('./img/모자5.png')} alt='cap'></img>)
    setDescription(
      <div> 
        <br></br>
        <div>✔  분석가 </div> 
        <br></br>
        <div>✔  객관적 </div>
        <br></br>
        <div>✔  중립적</div>
      </div>)
  }
}, [hatColor]);

  function Item(props)
  {
    return (
      <Grid>
        <h2 className='font-color'>{props.item.name}</h2>
        <p className='font-color'>{props.item.description}</p>
        {props.item.graph}

        <Button className="CheckButton">
          Check it out!
        </Button>
      </Grid>
      )
  }

  return (
    <Grid item container xs={12} spacing={5}>
      <Grid item xs={6}>
        <h2 className='font-color kkwak-kkye'>모자 별 시간</h2>
          <p className='font-color kkwak-kkye'>원그래프!</p>
        <div className='kkwak-kkye'>
          <Piechart hatTime={hatTime}></Piechart>
        </div>

        <div className='kkwak-kkye'>
        <Button className="CheckButton"  onClick={handleOpen} variant="contained" sx={{m:1}}>
          Check it out!
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Card sx={ModalStyle()} >
           <Grid container >
            <Grid item>
              <Box>
                <Grid  item container xs={12}>
                  <Grid>
                    <h2 id="unstyled-modal-title">내가 가장 좋아하는 모자는 <span style= {{color:hatColor}}> {hatColor}</span> 입니다. </h2>
                  </Grid>

                <Grid item xs={9}>
                  <Grid sx={{mt:2}} >
                    <h4 id="unstyled-modal-description"> ⏰ {resultTime} 동안 회의를 했습니다. </h4>
                  </Grid>
                  <Grid sx={{mt:2}}>
                    <h5 id="unstyled-modal-description"> {description}</h5>
                  </Grid>
                </Grid>

                <Grid item xs={3}sx={{mt:4}}>
                  {img}
                </Grid>

                </Grid>
              </Box>
            </Grid>
           </Grid>
          </Card>
        </Modal>
        </div>
      </Grid>

      <Grid item xs={5.5}>
        <h2 className='font-color'>총 회의 횟수 : {count}회</h2>
        <p className='font-color'>꺾은선 그래프!</p>
        <LineChart></LineChart>
        <Button className="CheckButton">
          Check it out!
        </Button>
      </Grid>
      {/* <Grid item xs={6}>
        {
          items.map( (item, i) => <Item key={i} item={item} /> )
        }
      </Grid> */}
    </Grid>
  )
}

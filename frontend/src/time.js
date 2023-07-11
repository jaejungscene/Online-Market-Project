import React from "react";


export default function TimerComponent(items){
  // console.log(items)
  // return(
  //   <div>
  //     <div>이름 : {items.name}</div>
  //     <div>학번 : {items.studentid}</div>
  //   </div>
  // )

  const [time, setTime] = React.useState(0); //1. state를 만듭니다.
	console.log('check');
	setTime(time+1);
	console.log('Rendering이 됩니다!');
	return <h3>{time}</h3>

  console.log("------------start-----------");
  const [num, setNum] = React.useState(0);
  console.log("컴포넌트 업데이트");
  function addNum(){
    if(num<=4)
      setNum(num+1);
  }
  function minusNum(){
    if(num>=-4)
      setNum(num-1);
  }
  React.useEffect(()=>{ // useEffect의 두 번째 인자에 들어가는 변수가 변경될 때마다 useEffect 안의 함수가 재실행됩니다. 만일 값이 없다면 딱 한 번만 실행되고 더 이상 실행되지 않습니다.
    console.log("###########useEffect###########");
    setNum(0);
  }, []);
  console.log('check')
  return(
    <div>
      <h3>
        {num}
      </h3>
      <button onClick={addNum}>1씩 올려주세요</button>
      <button onClick={minusNum}>1씩 내려주세요</button>
    </div>
  )
}

// export default TimerComponent;
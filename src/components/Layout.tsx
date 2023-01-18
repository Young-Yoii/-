import React from "react";
import { useRef, useState } from "react";
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

type State = {
    title: string,
    subTitle: string,
    description: string
}

const ThumnailWrap = styled.div`
    width:768px;
    height:402px;
`

const Layout = () => {
    const [inputs, setInputs] = useState<State>({
        title: '제목을 입력하세요',
        subTitle: '부제목을 입력하세요',
        description: '설명',
    });
    const [color, setColor] = useState('#dece56');
    const [fontColor, setFontColor] = useState('#000');
    const ref = useRef<any>([]);

    const arr = ['title', 'subTitle', 'description'];
    const ALLOW_FILE_EXTENSION = "jpg,jpge,png";
    const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

    const randomRGB = ()  => {
        let rgb = '';
        rgb += (Math.floor(Math.random() * 90 + 1) + 150)
            .toString(16)
            .padStart(2, '0');
        rgb += (Math.floor(Math.random() * 90 + 1) + 150)
            .toString(16)
            .padStart(2, '0');
        rgb += (Math.floor(Math.random() * 90 + 1) + 150)
            .toString(16)
            .padStart(2, '0');
        return rgb;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setInputs({
            ...inputs,
            [name] : value,
        })
    }

    const gradientBackground = () => {
        const rgb = randomRGB();

        ref.current[0].style.background = `linear-gradient(to bottom, ${color}, #${rgb})`
    }

    const colorBackground = () => {
        ref.current[0].style.background = `${color}`
    }

    const imageBackground = (e:React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target;
        const file = (image.files as FileList)?.[0];

        if(!fileExtensionValid(file)){
            image.value = '';
            alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`)
            return;
        }
        if(file.size > FILE_SIZE_MAX_LIMIT){
            image.value = '';
            alert('업로드 가능한 최대 용량은 5MB입니다. ')
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = (e) => {
            const result = e?.target?.result as string;
            ref.current[0].style.background = `url('${result}')`
            ref.current[0].style.backgroundSize = 'cover';
            ref.current[0].style.backgroundRepeat = 'no-repeat';
        }
    }

    const fileExtensionValid = (file:File):boolean => {
        const lastIndex = file.name.lastIndexOf('.');
        if(lastIndex < 0) return false;

        const extension = file.name.substring(lastIndex+1).toLowerCase();
        console.log(ALLOW_FILE_EXTENSION.indexOf(extension))
        if(!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') return false;
        return true;
    }

    const changeLayout = (e:any) => {
        const name = e.target.name;
        console.log(name)
        
         if(name === 'title') {
           [1,2,3].forEach(i => 
            ref.current[i].style.opacity = 1)
         }
         if(name === 'subTitle') {
            ref.current[3].style.opacity = 0;
            ref.current[1].style.opacity = 1;
            ref.current[2].style.opacity = 1;
         }
         if(name === 'description') {
            for(let i = 2; i < 4; i++) {
                ref.current[i].style.opacity = 0
            } 
         } 

    }

    const onDownloadBtn = () => {
        domtoimage
            .toBlob(ref.current[0])
            .then((blob) => {
            saveAs(blob, 'thumnail.png');
    });
};

    return (
        <>
            <h1>썸네일 메이커</h1>
            <ThumnailWrap ref={(el) => {ref.current[0] = el}} style={{backgroundColor: color}}>
                <h1 ref={(el) => {ref.current[1] = el}} style={{color: fontColor}}>{inputs.title}</h1>
                <h3 ref={(el) => {ref.current[2] = el}} style={{color: fontColor}}>{inputs.subTitle}</h3>
                <p ref={(el) => {ref.current[3] = el}} style={{color: fontColor}}>{inputs.description}</p>
            </ThumnailWrap>
            <div>
                <input name='title'  value={inputs.title} onChange={onChange}/>
                <input name='subTitle' value={inputs.subTitle} onChange={onChange}/>
                <input name='description' value={inputs.description} onChange={onChange}/>
            </div>
            <div>
                <span>배경을 정해주세요</span>
                <button><input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>색상선택</button>
                <button onClick={gradientBackground}>그라디언트</button>
                <button onClick={colorBackground}>단색</button>
                <button><input type="file" accept="image/jpg, image/png, image/jpeg" onChange={(e) => imageBackground(e)}/>이미지</button>
            </div>
            <div>
                <span>썸네일 구성요소</span>
                <button name='title' onClick={changeLayout}>제목 + 부제목 + 설명</button>
                <button name='subTitle' onClick={changeLayout}>제목 + 부제목</button>
                <button name='description' onClick={changeLayout}>제목</button>
            </div>
            <div>
                <span>썸네일 구성요소</span>
                <button name='title'><input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)}/>색상선택</button>
            </div>
            <button onClick={onDownloadBtn}>다운로드</button>
        </>
    )
}

export default Layout;
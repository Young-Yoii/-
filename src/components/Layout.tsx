import React from "react";
import { useRef, useState } from "react";
import InputColor from 'react-input-color';

type State = {
    title: string,
    subTitle: string,
    description: string
}

const Layout = () => {
    const [inputs, setInputs] = useState<State>({
        title: '제목을 입력하세요',
        subTitle: '부제목을 입력하세요',
        description: '설명',
    });
    const [color, setColor] = useState('#dece56');
    const ref = useRef<null[] | HTMLDivElement[]>([]);

    
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

        ref.current.style.background = `linear-gradient(to bottom, ${color}, #${rgb})`
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

        name === 'title' ? ref.current[1].style
    }

    return (
        <>
            <h1>썸네일 메이커</h1>
            <div ref={(el) => {ref.current[0] = el}} style={{backgroundColor: color}}>
                <div ref={(el) => {ref.current[1] = el}}>{inputs.title}</div>
                <h3 ref={(el) => {ref.current[2] = el}}>{inputs.subTitle}</h3>
                <p ref={(el) => {ref.current[3] = el}}>{inputs.description}</p>
            </div>
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
                <button name='title'>제목 + 부제목 + 설명</button>
                <button name={inputs.subTitle} onClick={() => setInputs({
                    ...inputs,
                    title: ''
                })}>제목 + 부제목</button>
                <button onClick={colorBackground}>제목</button>
            </div>
        </>
    )
}

export default Layout;
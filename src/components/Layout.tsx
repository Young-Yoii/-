import { useState } from "react";

type State = {
    title: string,
    subTitle: string,
    description: string
}

const Layout = () => {
    const [inputs, setTitleinputs] = useState<State>({
        title: '제목을 입력하세요',
        subTitle: '부제목을 입력하세요',
        description: '설명',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setTitleinputs({
            ...inputs,
            [name] : value,
        })
    }

    return (
        <>
            <h1>썸네일 메이커</h1>
            <div>
                <h1>{inputs.title}</h1>
                <p>{inputs.subTitle}</p>
                <p>{inputs.description}</p>
            </div>
            <div>
                <input name='title'  value={inputs.title} onChange={onChange}/>
                <input name='subTitle' value={inputs.subTitle} onChange={onChange}/>
                <input name='description' value={inputs.description} onChange={onChange}/>
            </div>
            <div>
                <span>배경을 정해주세요</span>
                <button>랜덤 그라디언트</button>
                <button>랜덤 단색</button>
                <button><input type="file"/>이미지</button>
            </div>
        </>
    )
}

export default Layout;
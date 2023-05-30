import React, { useState } from 'react';
import Main from "@/components/Main";

import * as S from "./styled";

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    
    return (
        <S.Container>
           <Main loading={loading} setLoading={setLoading}/>
        </S.Container>
    );
};


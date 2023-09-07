import { css } from "@mui/material";

const adderCss = css`
    background-color: skyblue;
`;

const Adder = () => {
    return (
        <div css={adderCss}>Adder Here</div>
    );
};

export default Adder;
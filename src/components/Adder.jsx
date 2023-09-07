import { Button, Chip, Divider, IconButton, MenuItem, OutlinedInput, Select, Switch, Tooltip, css } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const rootCss = theme => css`
  display: flex;
  flex-direction: column;
  row-gap: ${theme.spacing(2)};
`;

const rowListCss = theme => css`
  display: flex;
  flex-direction: column;
  row-gap: ${theme.spacing(1)};
`;

const rowCss = theme => css`
  display: flex;
  align-items: center;
  column-gap: ${theme.spacing(1)};
`;

const signColCss = css`
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 60px;
`;

const inputColCss = css`
  flex-grow: 1;
  flex-shrink: 1;
`;

const resultCss = css`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

const signOptions = [
  {
    value: 1,
    label: "+",
  },
  {
    value: -1,
    label: "-",
  },
];

const Adder = () => {
  return (
    <form css={rootCss}>
      <div css={rowListCss}>
        <div css={rowCss}>
          <div css={signColCss}>
            <Select fullWidth size="small" defaultValue={1}>
              {signOptions.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div css={inputColCss}>
            <OutlinedInput fullWidth size="small" defaultValue="1" />
          </div>
          <div>
            <Tooltip arrow placement="top" title="Toggle disabled/enabled">
              <Switch defaultChecked />
            </Tooltip>
          </div>
          <div>
            <Tooltip arrow placement="top" title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Button fullWidth variant="outlined" startIcon={<AddIcon />}>
          Add Row
        </Button>
      </div>
      <Divider>
        <Chip label="=" />
      </Divider>
      <div css={resultCss}>2</div>
    </form>
  );
};

export default Adder;

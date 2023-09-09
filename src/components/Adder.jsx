import { useCallback, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import exactMath from "exact-math";
import { Alert, Button, Chip, Divider, IconButton, MenuItem, OutlinedInput, Select, Switch, Tooltip, css } from "@mui/material";
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
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
`;

const onlyNumbers = value => {
  const dicimalPointIndex = value.indexOf(".");
  return value.replace(/[^0-9]/g, (c, i) => (dicimalPointIndex === i ? c : ""));
};

const sumRows = rows =>
  rows.reduce((acc, { sign, value, enabled }) => {
    if (!enabled || value === "") {
      return acc;
    }
    const numberValue = value.replace(/\.$/, "");
    const exactMathConfig = { returnString: true, eMinus: Infinity, ePlus: Infinity, maxDecimal: Infinity };
    switch (sign) {
      case "+":
        return exactMath.add(acc, numberValue, exactMathConfig);
      case "-":
        return exactMath.sub(acc, numberValue, exactMathConfig);
    }
    return acc;
  }, "0");

const formatter = new Intl.NumberFormat("en-US", { roundingPriority: "morePrecision" });

const Adder = () => {
  const {
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      rows: [
        { sign: "+", value: "1", enabled: true },
        { sign: "+", value: "1", enabled: true },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({ name: "rows", control });
  const [result, setResult] = useState(() => sumRows(getValues().rows));

  const handleAddRowClick = useCallback(() => append({ sign: "+", value: "0", enabled: true }), [append]);

  useEffect(() => {
    const subscription = watch(({ rows }) => setResult(sumRows(rows)));
    return () => subscription.unsubscribe();
  }, [watch, setResult]);

  console.log(errors);

  return (
    <form css={rootCss}>
      <div css={rowListCss}>
        {fields.length === 0 && (
          <Alert severity="info">Click on the button below to add a new row</Alert>
        )}
        {fields.map(({ id }, index) => (
          <div key={id} css={rowCss}>
            <div css={signColCss}>
              <Controller
                name={`rows.${index}.sign`}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <Select fullWidth size="small" inputRef={ref} {...rest}>
                    {["+", "-"].map(sign => (
                      <MenuItem key={sign} value={sign}>
                        {sign}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div css={inputColCss}>
              <Controller
                name={`rows.${index}.value`}
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, onChange, ...rest } }) => (
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(errors.rows?.[index]?.value)}
                    onChange={e => onChange(onlyNumbers(e.target.value))}
                    inputRef={ref}
                    {...rest}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name={`rows.${index}.enabled`}
                control={control}
                render={({ field: { value, ref, ...rest } }) => (
                  <Tooltip arrow placement="top" title="Toggle disabled/enabled">
                    <Switch checked={value} inputRef={ref} {...rest} />
                  </Tooltip>
                )}
              />
            </div>
            <div>
              <Tooltip arrow placement="top" title="Delete" onClick={() => remove(index)}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
        <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={handleAddRowClick}>
          Add Row
        </Button>
      </div>
      <Divider>
        <Chip label="=" />
      </Divider>
      <div css={resultCss}>{formatter.format(result)}</div>
    </form>
  );
};

export default Adder;

import { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Layout } from "../../components/layouts";

import Cookies from "js-cookie";

interface Props {
  theme: string;
}

const ThemeChangerPage = ({ theme }: Props) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value);
    Cookies.set("theme", event.target.value);
  };
  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                label="Light"
                value="light"
                control={<Radio />}
              />
              <FormControlLabel label="Dark" value="dark" control={<Radio />} />
              <FormControlLabel
                label="Custom"
                value="custom"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "light" } = req.cookies;
  const validThemes = ["light", "dark", "custom"];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "light",
    },
  };
};

export default ThemeChangerPage;

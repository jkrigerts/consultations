import { useState } from "react";
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
  UnstyledButton,
  Group,
  ThemeIcon,
  Button,
} from "@mantine/core";
import { Grain, List, Logout } from "tabler-icons-react";
import { useRouter } from "next/router";

import { useAuth } from "../../contexts/AuthContext";

import AttendeesFetcher from "./AttendeesFetcher";
import ConsultationsListEdit from "./ConsultationsListEdit";
import withAuth from "../auth/PrivateRoute";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

function Layout(props) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const [error, setError] = useState("");
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      router.replace("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          p="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow mt="md">
            <UnstyledButton
              component="a"
              href="/apmekletaji"
              sx={(theme) => ({
                textDecoration: "none",
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Group>
                <ThemeIcon variant="light" color="violet">
                  <Grain size={16} />
                </ThemeIcon>
                <Text size="sm">Apmeklētāji</Text>
              </Group>
            </UnstyledButton>
            <UnstyledButton
              component="a"
              href="/konsultacijas"
              sx={(theme) => ({
                textDecoration: "none",
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Group>
                <ThemeIcon variant="light">
                  <List size={16} />
                </ThemeIcon>
                <Text size="sm">Konsultācijas</Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
          <Navbar.Section>
            <UnstyledButton
              onClick={handleLogout}
              sx={(theme) => ({
                textDecoration: "none",
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Group>
                <ThemeIcon variant="light" color="red">
                  <Logout size={16} />
                </ThemeIcon>
                <Text size="sm">Izlogoties</Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Konsultācijas</Text>
          </div>
        </Header>
      }
    >
      {props.content}
    </AppShell>
  );
}

export default withAuth(Layout);

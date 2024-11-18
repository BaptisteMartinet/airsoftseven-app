import { Container, Group, Paper, Stack, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import { query } from "@/core/apolloClient";
import { StatsQuery } from '@components/pages/Home/api';

interface StatProps {
  title: string;
  formattedStat: string;
}

function Stat(props: StatProps) {
  const { title, formattedStat } = props;
  return (
    <Paper>
      <Stack align="center" gap={0}>
        <Text fz={64} fw={700} c="blue">{formattedStat}</Text>
        <Text fz="lg">{title}</Text>
      </Stack>
    </Paper>
  );
}

export default async function Stats() {
  const {
    data: { eventsCount, fieldsCount, clubsCount },
  } = await query({ query: StatsQuery });
  const t = await getTranslations('pages.Home.Stats');

  return (
    <Container size="sm" mb="xl">
      <Group justify="center" gap="xl" grow>
        <Stat title={t('eventsCount')} formattedStat={eventsCount.toString()} />
        <Stat title={t('fieldsCount')} formattedStat={fieldsCount.toString()} />
        <Stat title={t('clubsCount')} formattedStat={clubsCount.toString()} />
      </Group>
    </Container>
  );
}

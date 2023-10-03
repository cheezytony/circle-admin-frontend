<script lang="ts" setup>
import {
  AccountManagementType,
  StockOrder,
  StockAccountSummary,
  User,
StockOrderEx,
} from '~/types';

const props = defineProps<{
  user: User;
}>();
useHead({
  title: () => `${props.user.firstName}'s Stock Portfolio`,
});

const searchColumns = ['reference', 'amount', 'status', 'created_at'];

const accountSummaries = ref<StockAccountSummary[]>([]);
const selfManagedAccount = computed(() =>
  accountSummaries.value.find(
    (account) => account.account.management_type === AccountManagementType.SELF
  )
);
const updateAccountSummaries = (data: StockAccountSummary[]) => {
  accountSummaries.value = data;
};
</script>

<template>
  <div class="flex flex-col gap-4 md:gap-8">
    <ServerRequest
      :authorize="true"
      service="STOCKS"
      :url="`/accounts/summary/${props.user.id}`"
      @success="updateAccountSummaries"
    >
      <template #default>
        <div class="flex flex-col gap-4 md:flex-row md:gap-8">
          <Card v-if="selfManagedAccount" remove-padding>
            <!-- <CardHeading>
              {{ account.management_type }} Trading account
            </CardHeading> -->
            <Table>
              <thead>
                <TableRow>
                  <TableTH>Symbol</TableTH>
                  <TableTH align="right">Profit/Loss</TableTH>
                  <TableTH align="right">Value</TableTH>
                </TableRow>
              </thead>
              <tbody>
                <template
                  v-for="(position, positionIndex) in selfManagedAccount
                    .positions.equityPositions"
                  :key="positionIndex"
                >
                  <TableRow>
                    <TableTD>{{ position.symbol }}</TableTD>
                    <TableTD align="right">
                      <span
                        :class="{
                          'text-green-700': position.unrealizedPL > 0,
                          'text-red-700': position.unrealizedPL < 0,
                        }"
                      >
                        {{
                          numberFormat(position.unrealizedPL, 'currency', 'USD')
                        }}
                      </span>
                    </TableTD>
                    <TableTD align="right">
                      {{
                        numberFormat(position.marketValue, 'currency', 'USD')
                      }}
                    </TableTD>
                  </TableRow>
                </template>
                <TableRow>
                  <TableTD align="right" colspan="3">
                    {{
                      numberFormat(
                        selfManagedAccount.positions.equityValue,
                        'currency',
                        'USD'
                      )
                    }}
                  </TableTD>
                </TableRow>
              </tbody>
            </Table>
          </Card>
        </div>
      </template>

      <template #loading>
        <Card class="md:self-start" remove-padding>
          <TableLoader :cols="3" :rows="2" td="h-3 w-10" />
        </Card>
      </template>
    </ServerRequest>

    <Datatable
      :url="`/orders?user_id=${props.user.id}`"
      service="STOCKS"
      :search-columns="searchColumns"
      order-by="created_at"
      :order-by-ascending="false"
      :model="StockOrderEx"
    >
      <template #heading>
        <DatatableTH name="provider_order_no">
          Order Number
        </DatatableTH>
        <DatatableTH name="symbol">Symbol</DatatableTH>
        <DatatableTH align="right" name="amount">
          Amount
        </DatatableTH>
        <DatatableTH name="side">Side</DatatableTH>
        <DatatableTH name="status">Status</DatatableTH>
        <DatatableTH name="created_at">Date</DatatableTH>
      </template>
      <template #default="{ row }">
        <DatatableRow>
          <DatatableTD>{{ row.provider_order_no }}</DatatableTD>
          <DatatableTD>{{ row.symbol }}</DatatableTD>
          <DatatableTD align="right">
            <span
              :class="{
                'text-green-700': row.side === 'BUY',
                'text-red-700': row.side === 'SELL',
              }"
            >
              {{ numberFormat(row.amount, 'currency', 'USD') }}
            </span>
          </DatatableTD>
          <DatatableTD>{{ row.side }}</DatatableTD>
          <DatatableTD>
            <BadgeStatus :status="row.status" />
          </DatatableTD>
          <DatatableTD>
            {{ dateTimeFormat(row.created_at, 'date:compact:time') }}
          </DatatableTD>
        </DatatableRow>
      </template>
    </Datatable>
  </div>
</template>

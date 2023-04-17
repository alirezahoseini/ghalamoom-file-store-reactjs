// components
import GrowBoxes from './GrowBoxes/GrowBoxes'
import Chart from './Chart/Chart'

export default function DashboardTest() {

  return (
    <div id='dashboard'>
      <div className="wrapper">
        <div className="grow-boxes">
          <GrowBoxes />
        </div>
        <div className="dashboard-chart w-full h-52">
          <Chart />
        </div>
      </div>
    </div>
  )
}

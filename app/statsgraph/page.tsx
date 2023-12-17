'use client';

import React from 'react';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import "../globals.css"
import { courier } from '../../styles/courier';
import useStatsStore from '../../components/Typing/StatsStore';

interface GraphProps {
	data: number[];
	label: string;
	lineColor: string;
	fillColor: string;
}

const calculateStats = (data: number[]) => {
	const average = data.reduce((sum, value) => sum + value, 0) / data.length;
	const standardDeviation = Math.sqrt(
		data.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / data.length
	);
	const max = Math.max(...data);

	return { average, standardDeviation, max };
};

const Graph: React.FC<GraphProps> = ({ data, label, lineColor, fillColor }) => {
	const stats = calculateStats(data);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<div style={{ width: '45vw', height: '45vh' }}>
				<Line
					data={{
						labels: Array.from({ length: data.length }, (_, i) => (i + 1).toString()),
						datasets: [{
							label,
							data,
							fill: true,
							borderColor: lineColor,
							backgroundColor: fillColor
						}],
					}}
				/>
			</div>
			<div style={{ marginLeft: '2rem', fontSize: '1.3rem' }}>
				<p>
					<span title="Average">Avg: </span>
					<span style={{ color: lineColor }}>{stats.average.toFixed(2)}</span>
					<br />
					<span title="Standard deviation">SD: </span>
					<span style={{ color: lineColor }}>{stats.standardDeviation.toFixed(2)}</span>
					<br />
					<span title="Maximum">Max: </span>
					<span style={{ color: lineColor }}>{stats.max.toFixed(2)}</span>
				</p>
			</div>
		</div>
	);
};

const StatsPage = () => {
	const { speeds, accuracies } = useStatsStore();
	return (
		<div className={courier.className}>
			<h1 style={{ marginTop: '1.4rem', fontSize: '2.5rem', textAlign: 'center' }}>
				Statistics
			</h1>
			<Graph
				data={speeds}
				label='Speed (WPM)'
				lineColor='rgba(0, 184, 255, 1)'
				fillColor='rgba(0, 184, 255, 0.1)'
			/>
			<Graph
				data={accuracies}
				label='Accuracy (%)'
				lineColor='rgba(214, 50, 255, 1)'
				fillColor='rgba(214, 50, 255, 0.1)'
			/>
		</div>
	);
};

export default StatsPage;
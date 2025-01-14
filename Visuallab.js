import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Brain, Download, CheckCircle } from 'lucide-react';

export default function EnhancedAutoML() {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [dataPreview, setDataPreview] = useState(null);
  const [dataStats, setDataStats] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelMetrics, setModelMetrics] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      // Simulate reading CSV file
      setDataPreview({
        columns: ['feature1', 'feature2', 'feature3', 'target'],
        rows: [
          [1.2, 3.4, 2.1, 'Class A'],
          [2.3, 1.4, 3.2, 'Class B'],
          [3.1, 2.7, 1.8, 'Class A']
        ]
      });
      setDataStats({
        rows: 1000,
        columns: 4,
        missingValues: 23,
        dataTypes: {
          numeric: 3,
          categorical: 1
        }
      });
    }
  };

  const handleTrain = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setModelMetrics({
            accuracy: 0.89,
            precision: 0.87,
            recall: 0.86,
            f1: 0.865
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const MetricCard = ({ value, label, suffix = '' }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="text-2xl font-bold">
          {value !== null ? `${value}${suffix}` : '-'}
        </div>
        <div className="text-xs text-gray-500">{label}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Visual Lab</h1>
          <p className="text-gray-600">Machine Learning Specialist Agent</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 gap-4">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload size={16} />
              Upload
            </TabsTrigger>
            <TabsTrigger 
              value="profiling" 
              disabled={!file}
              className="flex items-center gap-2"
            >
              <FileText size={16} />
              Profiling
            </TabsTrigger>
            <TabsTrigger 
              value="modeling" 
              disabled={!file}
              className="flex items-center gap-2"
            >
              <Brain size={16} />
              Modeling
            </TabsTrigger>
            <TabsTrigger 
              value="download" 
              disabled={!modelMetrics}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Dataset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                    {file && (
                      <div className="mt-2 flex items-center justify-center text-sm text-green-600">
                        <CheckCircle size={16} className="mr-2" />
                        {file.name} uploaded successfully
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <MetricCard value={dataStats?.rows} label="Rows" />
                    <MetricCard value={dataStats?.columns} label="Columns" />
                    <MetricCard value={dataStats?.missingValues} label="Missing Values" />
                  </div>

                  {dataPreview && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Dataset Preview</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {dataPreview.columns.map((col, i) => (
                                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {dataPreview.rows.map((row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profiling">
            <Card>
              <CardHeader>
                <CardTitle>Data Profiling</CardTitle>
              </CardHeader>
              <CardContent>
                {dataStats && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-semibold mb-2">Data Types Distribution</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Numeric Features</span>
                              <span>{dataStats.dataTypes.numeric}</span>
                            </div>
                            <Progress value={75} className="h-2" />
                            <div className="flex justify-between text-sm">
                              <span>Categorical Features</span>
                              <span>{dataStats.dataTypes.categorical}</span>
                            </div>
                            <Progress value={25} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-semibold mb-2">Data Quality</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Completeness</span>
                              <span>97.7%</span>
                            </div>
                            <Progress value={97.7} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modeling">
            <Card>
              <CardHeader>
                <CardTitle>Model Training</CardTitle>
              </CardHeader>
              <CardContent>
                {!file ? (
                  <Alert>
                    <AlertDescription>
                      Please upload a dataset first to begin modeling.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    <Button 
                      onClick={handleTrain} 
                      disabled={isTraining}
                      className="w-full"
                    >
                      {isTraining ? 'Training in Progress...' : 'Train Models'}
                    </Button>

                    {isTraining && (
                      <div className="space-y-2">
                        <Progress value={trainingProgress} className="h-2" />
                        <div className="text-sm text-gray-500 text-center">
                          {trainingProgress}% Complete
                        </div>
                      </div>
                    )}

                    {modelMetrics && (
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        <MetricCard value={modelMetrics.accuracy * 100} label="Accuracy" suffix="%" />
                        <MetricCard value={modelMetrics.precision * 100} label="Precision" suffix="%" />
                        <MetricCard value={modelMetrics.recall * 100} label="Recall" suffix="%" />
                        <MetricCard value={modelMetrics.f1 * 100} label="F1 Score" suffix="%" />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="download">
            <Card>
              <CardHeader>
                <CardTitle>Download Model</CardTitle>
              </CardHeader>
              <CardContent>
                {!modelMetrics ? (
                  <Alert>
                    <AlertDescription>
                      No trained model available. Please train a model first!
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    <Button className="w-full">Download Model (.pkl)</Button>
                    <Button variant="outline" className="w-full">Download Training Report (.pdf)</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/UserContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { X, CheckCircle, Play, Award, ArrowLeft, BookOpen, Clock, FileText, Brain } from 'lucide-react'
import { courseContent } from './courseContent'

export default function Academy() {
  const { t } = useTranslation()
  const { user, recordQuizScore, completeLesson, addBadge } = useUser()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showCourseLessons, setShowCourseLessons] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState({})
  const [completedCourses, setCompletedCourses] = useState({})
  const [completedLessons, setCompletedLessons] = useState({})

  // Quiz questions for each lesson
  const quizzes = {
    '1-1': [ // Course 1 Lesson 1
      { question: 'What is the correct temperature range for refrigerated food storage?', options: ['0-4°C', '5-10°C', '10-15°C', '15-20°C'], correct: 0 },
      { question: 'Which food should be stored on the top shelf?', options: ['Raw meat', 'Cooked food', 'Raw vegetables', 'Dairy products'], correct: 2 },
      { question: 'How long can raw meat be stored in the refrigerator?', options: ['1-2 days', '3-5 days', '1-2 weeks', '2-3 weeks'], correct: 1 },
      { question: 'What is the freezer temperature for food storage?', options: ['-5°C', '-10°C', '-18°C or below', '-25°C'], correct: 2 },
      { question: 'Which container type is best for food storage?', options: ['Paper bags', 'Airtight containers', 'Plastic wrap', 'Aluminum foil'], correct: 1 },
      { question: 'How should leftover food be labeled?', options: ['Date only', 'Content and date', 'Content only', 'No label needed'], correct: 1 },
      { question: 'What is FIFO in food storage?', options: ['First In, First Out', 'Fresh In, Fresh Out', 'Food In, Food Out', 'Final In, Final Out'], correct: 0 },
      { question: 'How long can cooked food be stored at room temperature?', options: ['1 hour', '2 hours', '4 hours', '6 hours'], correct: 1 },
      { question: 'Which food requires special storage conditions?', options: ['Vegetables', 'Herbs', 'Herbs and spices', 'All the above'], correct: 2 },
      { question: 'What should you do before storing food?', options: ['Wash hands', 'Check cleanliness', 'Both A and B', 'Nothing'], correct: 2 },
      { question: 'How to prevent moisture in storage containers?', options: ['Use dry containers', 'Add silica packets', 'Store in dry area', 'All of the above'], correct: 3 },
      { question: 'What temperature indicates freezer burn?', options: ['Too cold', 'Fluctuating temperatures', 'Not cold enough', 'Wet conditions'], correct: 1 },
      { question: 'Can you store different types of food in the same container?', options: ['Yes', 'No', 'Only same type', 'Only if sealed'], correct: 1 },
      { question: 'What is the purpose of compartmentalization in storage?', options: ['Save space', 'Prevent cross-contamination', 'Make organization easier', 'Reduce costs'], correct: 1 },
      { question: 'How often should storage areas be cleaned?', options: ['Weekly', 'Daily', 'Monthly', 'Bi-weekly'], correct: 1 },
      { question: 'What type of lighting is best for storage areas?', options: ['Bright fluorescent', 'LED', 'Warm incandescent', 'Any light'], correct: 1 },
      { question: 'Can you store ready-to-eat food above raw meat?', options: ['Yes', 'No', 'Only sealed items', 'Depends on container'], correct: 1 },
      { question: 'What should be done with expired food items?', options: ['Donated', 'Discarded', 'Sold', 'Repackaged'], correct: 1 },
      { question: 'How to store dry goods properly?', options: ['In original packages', 'In airtight containers', 'On shelves', 'Any container'], correct: 1 },
      { question: 'What is the ideal humidity level for dry storage?', options: ['20-30%', '30-40%', '40-50%', '50-60%'], correct: 2 },
      { question: 'Can you store chemicals near food storage?', options: ['Yes', 'No', 'Only if sealed', 'In separate areas'], correct: 1 },
      { question: 'What should you check before storing canned goods?', options: ['Dents', 'Expiration date', 'Rust', 'All of the above'], correct: 3 },
      { question: 'How to properly rotate food inventory?', options: ['Last in first out', 'First in first out', 'Random rotation', 'No rotation needed'], correct: 1 },
      { question: 'What is cross-contamination in storage?', options: ['Mixing different foods', 'Raw food touching cooked', 'Food touching equipment', 'Bacteria spreading'], correct: 3 },
      { question: 'How should fresh produce be stored?', options: ['With raw meat', 'Separately from produce', 'In sealed bags', 'At room temperature'], correct: 1 },
      { question: 'What is the maximum storage time for frozen food?', options: ['3 months', '6 months', '1 year', 'Varies by type'], correct: 3 },
      { question: 'Should you wash produce before storage?', options: ['Always', 'Never', 'Only if dirty', 'Right before use'], correct: 3 },
      { question: 'How to store herbs for maximum freshness?', options: ['In water', 'In sealed bags', 'At room temperature', 'All methods valid'], correct: 0 },
      { question: 'What indicates food has gone bad in storage?', options: ['Color change', 'Odor', 'Texture change', 'All of the above'], correct: 3 },
      { question: 'How often should food storage inventory be checked?', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly'], correct: 0 },
      { question: 'What is proper temperature monitoring frequency?', options: ['Every hour', 'Every 4 hours', '2-3 times daily', 'Daily'], correct: 2 },
      { question: 'Can you store food items on the floor?', options: ['Yes', 'No', 'Only dry goods', 'Temporarily'], correct: 1 },
      { question: 'What should be the distance from food storage to ceiling?', options: ['6 inches', '12 inches', '18 inches', '24 inches'], correct: 3 },
      { question: 'How to prevent pest contamination in storage?', options: ['Sealed containers', 'Regular cleaning', 'Pest traps', 'All of the above'], correct: 3 },
      { question: 'What is the purpose of food rotation systems?', options: ['Organization', 'Prevent spoilage', 'Safety', 'All of the above'], correct: 3 },
      { question: 'How should you store vacuum-sealed foods?', options: ['Upright', 'Flat', 'Any position', 'With label visible'], correct: 3 },
      { question: 'Can temperature fluctuations affect stored food?', options: ['No', 'Slightly', 'Yes significantly', 'Depends on food'], correct: 2 },
      { question: 'What type of containers prevent chemical absorption?', options: ['Plastic', 'Glass', 'Metal', 'Wood'], correct: 1 },
      { question: 'How to store olive oil properly?', options: ['Room temperature', 'Refrigerated', 'Cool dark place', 'Any method'], correct: 2 },
      { question: 'What is proper labeling format for storage?', options: ['Date only', 'Content and date', 'Content date and time', 'Batch number'], correct: 2 },
      { question: 'How to organize a reach-in refrigerator?', options: ['Random', 'By type', 'FIFO method', 'Temperature zones'], correct: 3 },
      { question: 'What indicates proper freezer maintenance?', options: ['No frost buildup', 'Clean coils', 'Temperature stable', 'All of the above'], correct: 3 },
      { question: 'Can you refreeze thawed food?', options: ['Never', 'If thawed properly', 'Always safe', 'Only if refrozen quickly'], correct: 1 },
      { question: 'What is the first step in storage organization?', options: ['Inventory check', 'Cleaning', 'Labeling', 'Rotation'], correct: 1 },
      { question: 'How to handle food during power outages?', options: ['Keep unopened', 'Discard immediately', 'Check temperature', 'Use immediately'], correct: 0 },
      { question: 'What documentation is needed for food storage?', options: ['Purchase records', 'Temperature logs', 'Rotation records', 'All of the above'], correct: 3 },
      { question: 'How should bakery items be stored?', options: ['Room temperature', 'Refrigerated', 'Frozen', 'Depends on type'], correct: 3 },
      { question: 'Can you store spices in sunlight?', options: ['Yes', 'No', 'Only dried', 'Temporarily'], correct: 1 },
      { question: 'What is proper shelf spacing in storage?', options: ['No gap', 'Minimum 6 inches', 'Minimum 12 inches', 'Maximum height'], correct: 2 },
      { question: 'How to store onions and potatoes?', options: ['Together', 'Separately', 'Refrigerated', 'In water'], correct: 1 },
      { question: 'What training is needed for storage staff?', options: ['Basic training', 'Quarterly updates', 'Ongoing education', 'Annual certification'], correct: 2 }
    ],
    '1-2': [ // Course 1 Lesson 2
      { question: 'What is the safe internal temperature for chicken?', options: ['60°C', '65°C', '70°C', '75°C'], correct: 2 },
      { question: 'How often should thermometers be calibrated?', options: ['Monthly', 'Quarterly', 'Bi-annually', 'Annually'], correct: 0 },
      { question: 'What is the danger zone temperature range?', options: ['0-4°C', '4-25°C', '25-60°C', '60-75°C'], correct: 2 },
      { question: 'How long can food stay in the danger zone?', options: ['30 minutes', '1 hour', '2 hours', '4 hours'], correct: 2 },
      { question: 'What type of thermometer is most accurate?', options: ['Glass', 'Digital probe', 'Bimetallic', 'Infrared'], correct: 1 },
      { question: 'Where should you place a thermometer in meat?', options: ['Surface', 'Thickest part', 'Any location', 'Top layer'], correct: 1 },
      { question: 'What is proper food cooling temperature?', options: ['Room temperature', '21°C to 4°C', '40°C to 4°C', '60°C to 4°C'], correct: 2 },
      { question: 'How long should food take to cool to 4°C?', options: ['30 minutes', '1 hour', '2 hours', '4 hours'], correct: 3 },
      { question: 'Can you interrupt cooking and finish later?', options: ['Yes always', 'Never', 'Only if cooled', 'Only if reheated'], correct: 2 },
      { question: 'What is proper reheating temperature?', options: ['60°C', '65°C', '70°C', '75°C'], correct: 2 },
      { question: 'How many times can you reheat food?', options: ['Once', 'Twice', 'Multiple times', 'Never'], correct: 3 },
      { question: 'What food requires special temperature handling?', options: ['Ground meat', 'Poultry', 'Seafood', 'All of the above'], correct: 3 },
      { question: 'What is sous vide cooking temperature?', options: ['45-65°C', '65-75°C', '75-85°C', '85-95°C'], correct: 0 },
      { question: 'How to prevent thermal shock in food?', options: ['Quick heating', 'Gradual heating', 'Extreme temperatures', 'Room temperature'], correct: 1 },
      { question: 'What indicates a thermometer needs calibration?', options: ['Different readings', 'Old age', 'Drop damage', 'Any of the above'], correct: 3 },
      { question: 'How to calibrate a thermometer with ice?', options: ['32°F', '0°C', 'Both A and B', 'Neither'], correct: 2 },
      { question: 'What is boiling point calibration?', options: ['100°F', '100°C', '212°C', '32°C'], correct: 1 },
      { question: 'How long to check temperature during cooking?', options: ['Beginning only', 'Throughout', 'End only', 'Not needed'], correct: 1 },
      { question: 'What is carryover cooking?', options: ['Post-cooking', 'Residual heat increase', 'Cooling process', 'Temperature loss'], correct: 1 },
      { question: 'How much temperature rise from carryover?', options: ['1-2°C', '3-5°C', '5-10°C', '10-15°C'], correct: 2 },
      { question: 'Should you let meat rest after cooking?', options: ['Never', 'Always', 'Only sometimes', 'Depends on type'], correct: 1 },
      { question: 'What temperature is considered "holding temperature"?', options: ['Above 60°C', 'Above 65°C', 'Above 70°C', 'Above 75°C'], correct: 0 },
      { question: 'How long can hot food be held safely?', options: ['1 hour', '2 hours', '4 hours', '6 hours'], correct: 2 },
      { question: 'What equipment helps maintain temperatures?', options: ['Heat lamps', 'Warming drawer', 'Hot holding cabinet', 'All of above'], correct: 3 },
      { question: 'How to prevent temperature loss during service?', options: ['Cover food', 'Use insulated containers', 'Constant monitoring', 'All methods'], correct: 3 },
      { question: 'What is temperature abuse?', options: ['Overcooking', 'Improper handling', 'Both A and B', 'Neither'], correct: 1 },
      { question: 'How does temperature affect bacteria?', options: ['No effect', 'Slows growth', 'Stops growth', 'Kills bacteria'], correct: 3 },
      { question: 'What is the safest minimum internal temperature for beef?', options: ['60°C', '63°C', '70°C', '75°C'], correct: 1 },
      { question: 'How to safely thaw frozen food?', options: ['Room temperature', 'Refrigerator', 'Cold water', 'B and C only'], correct: 3 },
      { question: 'What is "slow thaw" method temperature?', options: ['Room temperature', '4°C', '10°C', '15°C'], correct: 1 },
      { question: 'How long to thaw in cold water?', options: ['30 minutes', '1 hour per pound', '2 hours', 'Varies by item'], correct: 3 },
      { question: 'Can you thaw at room temperature?', options: ['Yes', 'No', 'Only sometimes', 'Rarely safe'], correct: 1 },
      { question: 'What is microwave thawing concern?', options: ['Uneven thaw', 'Partial cooking', 'Temperature zones', 'All of above'], correct: 3 },
      { question: 'How to monitor cooking in large quantities?', options: ['One check', 'Multiple checks', 'Continuous', 'Final check'], correct: 2 },
      { question: 'What thermometer placement prevents undercooked food?', options: ['Surface', 'Middle', 'Deepest part', 'Random spots'], correct: 2 },
      { question: 'How often should holding equipment be checked?', options: ['Hour', '2 hours', '4 hours', 'Once daily'], correct: 1 },
      { question: 'What indicates temperature control failure?', options: ['Unusual odor', 'Color change', 'Temperature fluctuation', 'Any sign'], correct: 3 },
      { question: 'Can you partially cook food ahead?', options: ['Yes', 'No', 'Only sometimes', 'Depends on temp'], correct: 1 },
      { question: 'What is "time-temperature abuse"?', options: ['Overcooking', 'Extended temp zone', 'Undercooking', 'Rapid heating'], correct: 1 },
      { question: 'How to prevent temperature stratification?', options: ['Stir frequently', 'Monitor spots', 'Mix contents', 'All methods'], correct: 3 },
      { question: 'What food is most sensitive to temperature?', options: ['Vegetables', 'Seafood', 'Poultry', 'Beef'], correct: 2 },
      { question: 'How to document temperature monitoring?', options: ['Written logs', 'Digital records', 'Staff memory', 'A and B'], correct: 2 },
      { question: 'What training covers temperature control?', options: ['Minimal', 'Mandatory', 'Optional', 'Advanced only'], correct: 1 },
      { question: 'How temperature records improve safety?', options: ['Identify trends', 'Prevent issues', 'Show compliance', 'All above'], correct: 3 },
      { question: 'What happens at -18°C?', options: ['Bacteria sleeps', 'No bacterial growth', 'Slow decay', 'Stops all decay'], correct: 1 },
      { question: 'Is room temp equal for all foods?', options: ['Yes', 'No', 'Sometimes', 'Not important'], correct: 1 },
      { question: 'What HACCP monitoring relates to temperature?', options: ['Step 3', 'Step 5', 'Step 7', 'Step 9'], correct: 1 },
      { question: 'How long can prepared food wait before service?', options: ['30 min', '1 hour', '2 hours', '4 hours'], correct: 1 }
    ],
    '1-3': [ // Course 1 Lesson 3 - more quizzes for other lessons following same pattern
      { question: 'What is cross-contamination?', options: ['Cooking together', 'Bacteria transfer', 'Mixed flavors', 'Shared equipment'], correct: 1 },
      { question: 'How does cross-contamination occur?', options: ['Direct contact', 'Shared equipment', 'Food handler hands', 'All of above'], correct: 3 },
      { question: 'What is the highest risk of cross-contamination?', options: ['Cooked to raw', 'Raw to cooked', 'Same type mixing', 'Storage proximity'], correct: 1 },
      { question: 'How to prevent cross-contamination during prep?', options: ['Separate surfaces', 'Different cutting boards', 'Clean utensils', 'All methods'], correct: 3 },
      { question: 'What color cutting board for raw meat?', options: ['Red', 'Yellow', 'Green', 'Blue'], correct: 0 },
      { question: 'What color for ready-to-eat food?', options: ['Red', 'Yellow', 'White', 'Brown'], correct: 2 },
      { question: 'How often to change cutting board?', options: ['Never', 'After each use', 'Every hour', 'Every 4 hours'], correct: 1 },
      { question: 'Can you use same cutting board after washing?', options: ['No', 'Yes if washed', 'Only for same type', 'Never advisable'], correct: 1 },
      { question: 'What is the proper washing procedure?', options: ['Hot water only', 'Soap and hot water', 'Both plus sanitizer', 'Just rinse'], correct: 2 },
      { question: 'How long to air dry equipment?', options: ['Minutes', 'Hours', '30 seconds', 'Not needed if sanitized'], correct: 3 },
      { question: 'What sanitizer concentration is safe?', options: ['100 ppm', '200 ppm', '400 ppm', 'Test strips show'], correct: 3 },
      { question: 'How to test sanitizer effectiveness?', options: ['Visual', 'Smell', 'Test strips', 'All methods'], correct: 2 },
      { question: 'What is indirect cross-contamination?', options: ['Direct touch', 'Via hands/surfaces', 'Food to food', 'Equipment only'], correct: 1 },
      { question: 'Can gloves prevent cross-contamination?', options: ['Always', 'Never', 'If changed regularly', 'Not reliable alone'], correct: 3 },
      { question: 'How often should you change gloves?', options: ['Once per shift', 'After each task', 'Every hour', 'As needed'], correct: 1 },
      { question: 'What about cross-contamination from prep area?', options: ['Unlikely', 'Very possible', 'Avoidable', 'Rare'], correct: 1 },
      { question: 'How to organize prep stations?', options: ['Random', 'By food type', 'Meat separate', 'All segregated'], correct: 3 },
      { question: 'What causes cross-contamination in storage?', options: ['Proximity', 'Dripping', 'Shared surfaces', 'All reasons'], correct: 3 },
      { question: 'Should raw items be above cooked?', options: ['Yes', 'No', 'Doesnt matter', 'If sealed'], correct: 1 },
      { question: 'How to store raw vegetables?', options: ['With meat', 'Below meat', 'Separately', 'In sealed bags'], correct: 2 },
      { question: 'What utensil practice prevents contamination?', options: ['Wash between uses', 'Use different sets', 'Store separately', 'All practices'], correct: 3 },
      { question: 'Can you reuse utensils without washing?', options: ['Yes', 'No', 'Only for same type', 'If air dried'], correct: 1 },
      { question: 'What is "contact surface" concern?', options: ['Rare issue', 'Major risk', 'Not important', 'Only in kitchens'], correct: 1 },
      { question: 'How to clean contact surfaces?', options: ['Water only', 'Soap and water', 'Sanitizer', 'All steps'], correct: 2 },
      { question: 'What about cross-contamination training?', options: ['Optional', 'Mandatory', 'Advanced only', 'Quarterly'], correct: 1 },
      { question: 'How does temperature affect cross-contamination risk?', options: ['No effect', 'Higher risk warm', 'Lower risk cold', 'Bacteria dies'], correct: 1 },
      { question: 'Can cooking eliminate cross-contamination?', options: ['Yes completely', 'No always', 'Sometimes', 'If proper temps'], correct: 3 },
      { question: 'What is the rule for hand washing?', options: ['Optional', 'Recommended', 'Mandatory', 'Varies'], correct: 2 },
      { question: 'How long to hand wash?', options: ['5 seconds', '10 seconds', '20 seconds', '30 seconds'], correct: 2 },
      { question: 'What about bare hand contact?', options: ['Allowed', 'Prohibited', 'Only vegetables', 'If clean'], correct: 1 },
      { question: 'Can you prepare foods at same time?', options: ['Yes always', 'Never', 'Different areas', 'Not together'], correct: 2 },
      { question: 'What is "allergen cross-contamination"?', options: ['Flavor mixing', 'Allergen transfer', 'Recipe change', 'Cooking issue'], correct: 1 },
      { question: 'How serious is allergen contamination?', options: ['Minor', 'Serious', 'Fatal possible', 'Not concerning'], correct: 2 },
      { question: 'What protocol for allergen prep?', options: ['Separate', 'Labeled', 'Sequenced', 'All precautions'], correct: 3 },
      { question: 'Can you touch ready-to-eat after raw?', options: ['Yes', 'No', 'If washed', 'If gloved'], correct: 1 },
      { question: 'What cleaning agent kills bacteria?', options: ['Water', 'Soap', 'Sanitizer', 'All required'], correct: 2 },
      { question: 'How often sanitize food contact surfaces?', options: ['Never', 'As needed', 'Every hour', 'Between tasks'], correct: 3 },
      { question: 'What is "time as control" concept?', options: ['Limiting exposure', 'Quick service', 'Rotation', 'Temperature related'], correct: 0 },
      { question: 'Can microbes survive freezing?', options: ['No never', 'Yes fully viable', 'Some survive', 'All die'], correct: 1 },
      { question: 'What about thawing cross-contamination?', options: ['Unlikely', 'Possible', 'Very likely', 'Common occurrence'], correct: 2 },
      { question: 'How to thaw safely?', options: ['Room temperature', 'Refrigerator', 'Cold water', 'B and C'], correct: 3 },
      { question: 'What is "color coding" system?', options: ['Decoration', 'Organization', 'Cross-contamination prevention', 'Labeling'], correct: 2 },
      { question: 'Are plastic boards safe?', options: ['Yes always', 'No never', 'If maintained', 'Only for produce'], correct: 2 },
      { question: 'What about wooden cutting boards?', options: ['Banned', 'Allowed if maintained', 'Never safe', 'Only small'], correct: 1 },
      { question: 'How to store different boards?', options: ['Together', 'Separately', 'Vertically', 'In drawers'], correct: 1 },
      { question: 'Can cross-contamination happen in trash?', options: ['No', 'Yes', 'Unlikely', 'Rarely'], correct: 1 },
      { question: 'What waste disposal prevents contamination?', options: ['Regular', 'Covered bins', 'Separate containers', 'All methods'], correct: 3 }
    ],
    '1-4': [ // Cleaning & Sanitation
      { question: 'What is the three-compartment sink used for?', options: ['Washing only', 'Washing, rinsing, sanitizing', 'Soaking only', 'Drying'], correct: 1 },
      { question: 'How often should food contact surfaces be cleaned?', options: ['Daily', 'Every 4 hours', 'Between tasks', 'Weekly'], correct: 2 },
      { question: 'What temperature water for manual washing?', options: ['32°C', '43°C', '54°C', '65°C'], correct: 2 },
      { question: 'What sanitizer concentration for soaking?', options: ['25 ppm', '50 ppm', '100 ppm', '200 ppm'], correct: 2 },
      { question: 'How long to soak utensils in sanitizer?', options: ['10 seconds', '30 seconds', '1 minute', '5 minutes'], correct: 2 },
      { question: 'What should be cleaned first in the sink?', options: ['Plates', 'Glasses', 'Pots', 'Utensils'], correct: 1 },
      { question: 'How to prevent contamination while cleaning?', options: ['Use gloves', 'Proper water temperature', 'Change water', 'All methods'], correct: 3 },
      { question: 'What indicates dirty dishwashing water?', options: ['Color change', 'Odor', 'Visible debris', 'All signs'], correct: 3 },
      { question: 'When should dishwashing water be changed?', options: ['Every hour', 'Every 4 hours', 'When visibly dirty', 'Daily'], correct: 2 },
      { question: 'What is "pre-rinsing" equipment?', options: ['First wash', 'Remove food particles', 'Sanitizing', 'Drying step'], correct: 1 },
      { question: 'How to dry cleaned dishes?', options: ['Air dry', 'Paper towels', 'Cloth towels', 'Air dry method best'], correct: 3 },
      { question: 'What is the proper shelf storage after cleaning?', options: ['Any shelf', 'Below raw food', 'Above raw food', 'Separate area'], correct: 2 },
      { question: 'How often to clean floors?', options: ['Daily', 'Weekly', 'Multiple times daily', 'As needed'], correct: 2 },
      { question: 'What floor cleaner for food areas?', options: ['Regular bleach', 'Food-safe sanitizer', 'Any cleaner', 'Just water'], correct: 1 },
      { question: 'How to clean walls in kitchen?', options: ['Annually', 'Monthly', 'Weekly to monthly', 'Daily'], correct: 2 },
      { question: 'What about cleaning refrigerator coils?', options: ['Never', 'Weekly', 'Monthly', 'Quarterly'], correct: 3 },
      { question: 'How to handle grease buildup?', options: ['Ignore', 'Monthly cleaning', 'Degreaser use', 'Professional cleaning'], correct: 2 },
      { question: 'What is sanitization versus sterilization?', options: ['Same thing', 'Different levels', 'Sanitize kills all', 'Sterilize better'], correct: 1 },
      { question: 'How long for sanitizer to work?', options: ['Immediate', 'Several seconds', 'Minutes', 'Hours'], correct: 1 },
      { question: 'What happens to sanitizer effectiveness over time?', options: ['Stays same', 'Gets stronger', 'Decreases', 'Varies'], correct: 2 },
      { question: 'Should you rinse after sanitizing?', options: ['Always', 'Never', 'Not typically', 'Only sometimes'], correct: 2 },
      { question: 'What cross-contamination risk in cleaning?', options: ['Low', 'High', 'None', 'Minimal'], correct: 1 },
      { question: 'How to prevent cleaning cross-contamination?', options: ['Separate cloths', 'Color coding', 'Dedicated areas', 'All methods'], correct: 3 },
      { question: 'What color cloth for food contact surfaces?', options: ['Any color', 'Red', 'White', 'Different colors'], correct: 3 },
      { question: 'Should you wash cloth between uses?', options: ['No', 'Yes', 'Not needed', 'Depends'], correct: 1 },
      { question: 'What sanitizer types are available?', options: ['Chlorine only', 'Iodine only', 'Multiple types', 'Alcohol only'], correct: 2 },
      { question: 'How to test sanitizer levels?', options: ['Visual', 'Smell', 'Test strips', 'Guessing'], correct: 2 },
      { question: 'What happens with low sanitizer concentration?', options: ['Still works', 'Less effective', 'Doesnt work', 'Unknown'], correct: 1 },
      { question: 'How to handle dirty utensils stacking?', options: ['Stack high', 'Separate', 'Soak before', 'Air dry'], correct: 1 },
      { question: 'What about cleaning cutting boards?', options: ['Hot water only', 'Soap and hot water', 'Plus sanitizer', 'All steps'], correct: 2 },
      { question: 'How often to replace cutting boards?', options: ['Never', 'Annually', 'When damaged', 'Every 5 years'], correct: 2 },
      { question: 'What is commercial dishwashing?', options: ['Manual', 'Machine', 'Both methods', 'Varies'], correct: 2 },
      { question: 'What temperature commercial dishwasher?', options: ['49°C', '60°C', '82°C', '100°C'], correct: 2 },
      { question: 'How long dishwasher cycle typically?', options: ['30 seconds', '1 minute', '2 minutes', '5 minutes'], correct: 2 },
      { question: 'Should items be rinsed before dishwasher?', options: ['Always', 'Never', 'Pre-rinse', 'Not needed'], correct: 2 },
      { question: 'What detergent for commercial dishwasher?', options: ['Residential', 'Commercial grade', 'Any detergent', 'None needed'], correct: 1 },
      { question: 'How to maintain commercial dishwasher?', options: ['Never', 'Weekly', 'Daily cleaning', 'Professional'], correct: 2 },
      { question: 'What about sanitizing with steam?', options: ['Ineffective', 'Effective method', 'Too slow', 'Not recommended'], correct: 1 },
      { question: 'How hot is steam sanitizing?', options: ['60°C', '80°C', '100°C+', 'Varies'], correct: 2 },
      { question: 'What surfaces need sanitizing daily?', options: ['All', 'Food contact', 'Floors', 'Walls'], correct: 1 },
      { question: 'How to document cleaning procedures?', options: ['Memory', 'Written logs', 'Digital records', 'B or C'], correct: 3 },
      { question: 'What staff need cleaning training?', options: ['Managers', 'All staff', 'Dishwashers', 'Cooks'], correct: 1 },
      { question: 'How often cleaning training?', options: ['Once', 'Annually', 'Quarterly', 'Ongoing'], correct: 3 },
      { question: 'What is cleaning schedule importance?', options: ['Minimal', 'Moderate', 'Critical', 'Optional'], correct: 2 },
      { question: 'Should you clean while operating?', options: ['Yes', 'No', 'Only certain areas', 'During breaks'], correct: 3 },
      { question: 'What HACCP relates to sanitation?', options: ['Step 1', 'Step 5', 'Step 10', 'No relation'], correct: 1 },
      { question: 'How to remove stubborn food residue?', options: ['Scrubbing', 'Soaking', 'Chemical treatment', 'All methods'], correct: 3 },
      { question: 'What about sanitizing sponges?', options: ['Reuse daily', 'Sanitize regularly', 'Never reuse', 'Use alternatives'], correct: 3 },
      { question: 'How often replace cleaning sponges?', options: ['Weekly', 'Daily', 'Never', 'When needed'], correct: 3 }
    ],
    '1-5': [ // Documentation & Records
      { question: 'Why keep food safety records?', options: ['Optional', 'Legal requirement', 'For inspection', 'All reasons'], correct: 3 },
      { question: 'How long keep food safety records?', options: ['1 month', '3 months', '1 year', 'Varies by law'], correct: 3 },
      { question: 'What records are most important?', options: ['Temperature logs', 'Cleaning logs', 'Purchase records', 'All critical'], correct: 3 },
      { question: 'Who is responsible for documentation?', options: ['Manager only', 'All staff', 'Designated person', 'Required person'], correct: 2 },
      { question: 'What should temperature logs include?', options: ['Time', 'Temperature', 'Person', 'All details'], correct: 3 },
      { question: 'How often check temperature logs?', options: ['Daily', 'Weekly', 'Monthly', 'Before service'], correct: 0 },
      { question: 'What format for temperature logs?', options: ['Digital', 'Paper', 'Either', 'Specific format'], correct: 2 },
      { question: 'Can you alter food safety records?', options: ['Yes', 'No', 'If necessary', 'With permission'], correct: 1 },
      { question: 'What cleaning records document?', options: ['What cleaned', 'When cleaned', 'Who cleaned', 'All information'], correct: 3 },
      { question: 'How often review cleaning logs?', options: ['Never', 'Weekly', 'Monthly', 'Regularly'], correct: 3 },
      { question: 'What supplier records are needed?', options: ['Names only', 'Contact info', 'Certificates', 'All details'], correct: 3 },
      { question: 'How to verify supplier safety?', options: ['Certificates', 'Inspections', 'Testing', 'Documentation'], correct: 3 },
      { question: 'What about recall procedures?', options: ['Not needed', 'Documentation', 'Written procedures', 'Required'], correct: 3 },
      { question: 'How to respond to contamination reports?', options: ['Investigate', 'Document', 'Follow procedures', 'All steps'], correct: 3 },
      { question: 'What about incident reporting?', options: ['Optional', 'Required', 'Manager only', 'Not needed'], correct: 1 },
      { question: 'How to document illness reports?', options: ['Verbal', 'Written', 'Specific format', 'Digital'], correct: 2 },
      { question: 'What staff training records include?', options: ['Names', 'Dates', 'Topics', 'All information'], correct: 3 },
      { question: 'How long keep training records?', options: ['1 year', '2 years', '3 years', 'Varies'], correct: 3 },
      { question: 'Can inspectors review records?', options: ['No', 'Yes', 'Only if asked', 'Sometimes'], correct: 1 },
      { question: 'What about audit trails in systems?', options: ['Not needed', 'Recommended', 'Required', 'Optional'], correct: 2 },
      { question: 'How to secure food safety records?', options: ['File cabinet', 'Password protected', 'Locked storage', 'All methods'], correct: 2 },
      { question: 'What about electronic record security?', options: ['No backup', 'Regular backups', 'Cloud storage', 'Multiple locations'], correct: 2 },
      { question: 'How to prevent record falsification?', options: ['Trust', 'Verification', 'Supervision', 'Accountability'], correct: 3 },
      { question: 'What records show HACCP compliance?', options: ['Temperature', 'Monitoring', 'Procedures', 'All records'], correct: 3 },
      { question: 'How often verify recordkeeping?', options: ['Never', 'Monthly', 'Quarterly', 'Regularly'], correct: 3 },
      { question: 'What should corrective actions show?', options: ['Problem', 'Action taken', 'Result', 'All details'], correct: 3 },
      { question: 'How to handle record corrections?', options: ['White-out', 'Line through', 'Electronic delete', 'Full rewrite'], correct: 1 },
      { question: 'Should staff sign temperature logs?', options: ['No', 'Yes', 'Sometimes', 'Not required'], correct: 1 },
      { question: 'What about equipment maintenance records?', options: ['Optional', 'Important', 'Critical', 'Required'], correct: 3 },
      { question: 'How to document equipment calibration?', options: ['Mental note', 'Written log', 'Digital record', 'B or C'], correct: 3 },
      { question: 'What pest control records show?', options: ['Date', 'Treatment', 'Results', 'All information'], correct: 3 },
      { question: 'How often update pest records?', options: ['Monthly', 'Per treatment', 'Annually', 'Quarterly'], correct: 1 },
      { question: 'Should visitors sign in?', options: ['No', 'Yes', 'Not required', 'Optional'], correct: 1 },
      { question: 'What about trace-back records?', options: ['Not needed', 'For ingredients', 'For products', 'Critical'], correct: 3 },
      { question: 'How to organize records for inspection?', options: ['Random', 'By date', 'By category', 'Organized system'], correct: 3 },
      { question: 'What inspector looks for in records?', options: ['Completeness', 'Accuracy', 'Compliance', 'All factors'], correct: 3 },
      { question: 'How to respond to record violations?', options: ['Ignore', 'Explain', 'Correct', 'Document'], correct: 2 },
      { question: 'What about legal hold on records?', options: ['Not applicable', 'Not needed', 'During litigation', 'Permanent'], correct: 2 },
      { question: 'Should records be readily available?', options: ['No', 'Yes', 'During inspection', 'Not required'], correct: 1 },
      { question: 'How to preserve historical records?', options: ['Discard', 'Archive', 'Store safely', 'Digital copy'], correct: 2 },
      { question: 'What record access control needed?', options: ['None', 'Restricted', 'Limited', 'Role-based'], correct: 3 },
      { question: 'How staff understand documentation?', options: ['Training', 'Demonstrations', 'Written guides', 'All methods'], correct: 3 },
      { question: 'What about third-party audits?', options: ['Not needed', 'Recommended', 'Required', 'Optional'], correct: 1 },
      { question: 'How often conduct mock inspections?', options: ['Never', 'Quarterly', 'Annually', 'Semi-annually'], correct: 3 },
      { question: 'Should records backup be tested?', options: ['No', 'Yes', 'Not needed', 'Optional'], correct: 1 },
      { question: 'What about HACCP plans documentation?', options: ['Optional', 'Required', 'Recommended', 'Critical'], correct: 3 },
      { question: 'How to verify record authenticity?', options: ['Visual check', 'Signature', 'Timestamp', 'All methods'], correct: 3 }
    ]
  }

  // Add more quizzes for Lesson 2 - Temperature Control
  // Add more quizzes for Lesson 3 - Cross-Contamination
  // These follow the same pattern with 50+ questions each

  // Build courses from imported courseContent
  const getCoursesData = () => {
    return [
      {
        id: 1,
        titleKey: 'course1Title',
        descKey: 'course1Desc',
        progress: 65,
        status: 'inProgress',
        modules: 5,
        enrollees: 234,
        duration: '4 weeks',
        certificate: true,
        topics: ['Food Storage', 'Temperature Control', 'Cross-Contamination', 'Cleaning', 'Documentation'],
        lessons: courseContent.course1.lessons.length,
        lessonsList: courseContent.course1.lessons
      },
      {
        id: 2,
        titleKey: 'course2Title',
        descKey: 'course2Desc',
        progress: 45,
        status: 'inProgress',
        modules: 5,
        enrollees: 156,
        duration: '3 weeks',
        certificate: true,
        topics: ['HACCP', 'Sanitation Plans', 'Staff Training', 'Supplier Management', 'Standards'],
        lessons: 5,
        lessonsList: courseContent.course2.lessons || [
          { id: 1, title: 'Professional Sanitation Standards', duration: '30 min', content: courseContent.course2.lessons?.[0]?.content || '' },
          { id: 2, title: 'HACCP Principles & Implementation', duration: '28 min', content: 'Coming soon...' },
          { id: 3, title: 'Developing Sanitation Plans', duration: '26 min', content: 'Coming soon...' },
          { id: 4, title: 'Staff Training Programs', duration: '24 min', content: 'Coming soon...' },
          { id: 5, title: 'Health Inspection Preparation', duration: '20 min', content: 'Coming soon...' }
        ]
      },
      {
        id: 3,
        titleKey: 'course3Title',
        descKey: 'course3Desc',
        progress: 80,
        status: 'inProgress',
        modules: 4,
        enrollees: 312,
        duration: '2 weeks',
        certificate: true,
        topics: ['Allergen Identification', 'Cross-Allergen Prevention', 'Labeling', 'Staff Awareness'],
        lessons: 4,
        lessonsList: [
          { id: 1, title: 'Understanding Major Allergens', duration: '20 min', content: `## Understanding Major Allergens

Allergens are substances that can cause serious or fatal reactions in sensitive individuals. There are 9 major allergens in North America that account for 90% of all allergic reactions.

### The 9 Major Allergens

**1. Peanuts**
- Legume, NOT tree nut
- Found in: Peanut butter, sauces, desserts, candy
- Symptoms: Anaphylaxis, throat swelling, hives
- Severity: Extremely severe in many cases

**2. Tree Nuts**
- Almonds, cashews, walnuts, pecans, pistachios, Brazil nuts, macadamia nuts
- Cross-reactivity possible between different nuts
- Found in: Baked goods, candy, sauces, spreads

**3. Milk**
- Most common allergen in children
- Found in: Dairy products, baked goods, chocolate
- May be hidden in: Dressings, some meats, non-dairy items

**4. Eggs**
- Common in: Baked goods, sauces, processed foods
- Can be found in: Pasta, ice cream, mayonnaise
- Very common allergen

**5. Fish**
- High protein content causes reactions
- Found in: Sushi, fish sauce, Caesar salad, Worcestershire sauce
- Different fish may cause different reactions

**6. Shellfish**
- Includes: Shrimp, crab, lobster, mussels, oysters, clams, scallops
- Found in: Seafood dishes, Asian sauces, some soups
- Often hidden in seemingly vegetarian dishes

**7. Wheat**
- Gluten content not the issue for allergies (separate from celiac)
- Found in: Bread, pasta, cereals, many sauces
- Present in many processed foods

**8. Soy**
- Legume allergen
- Found in: Soy sauce, tofu, many Asian dishes
- Very common in processed foods

**9. Sesame** (newly added in many countries)
- Found in: Tahini, hummus, bagels, Asian dishes
- Growing number of allergies
- Often not clearly labeled

### Severity Levels

**Mild Reactions**:
- Itching in mouth
- Hives on skin
- Stomach upset

**Moderate Reactions**:
- Swelling of lips, tongue
- Vomiting
- Abdominal cramps
- Multiple hive locations

**Severe Reactions (Anaphylaxis)**:
- Throat swelling preventing breathing
- Severe drop in blood pressure
- Loss of consciousness
- Requires immediate emergency response
- CAN BE FATAL

### Cross-Reactivity

**Important**: Some people allergic to one food are also allergic to related foods:
- All tree nuts: If allergic to one, might be to others
- Shellfish: Shrimp allergy often means all shellfish
- Peanuts + tree nuts: Sometimes co-occurring
- Birch pollen + tree nuts: Environmental cross-reactivity

### Hidden Allergens

These foods/preparations often contain unlisted allergens:
- Sauces and gravies: May contain milk, shellfish stock
- Fried foods: Cross-contamination from shared fryers
- Asian dishes: Often contain multiple allergens
- Desserts: May contain tree nuts, milk, eggs
- Processed meats: May contain milk proteins
- Non-dairy creamers: May contain milk protein

### Cross-Contact Risks in Kitchens

- Shared cooking oil for peanut and other items
- Toaster for wheat and other bread
- Cutting boards used for multiple allergens
- Shared utensils and equipment
- Flour dust in air affecting non-flour foods
- Shared fryers for different foods
- Hands touched one allergen then another

Remember: Any allergen exposure is risky - Complete separation is best!` },
          { id: 2, title: 'Allergen Management Procedures', duration: '25 min', content: 'Comprehensive procedures for safe allergen handling...' },
          { id: 3, title: 'Cross-Allergen Prevention', duration: '22 min', content: 'Preventing cross-contamination between allergens...' },
          { id: 4, title: 'Training & Communication', duration: '18 min', content: 'Staff training and customer communication about allergens...' }
        ]
      }
    ]
  }

  const courses = getCoursesData()

  const progressData = courses.map(c => ({
    name: t(`academy.${c.titleKey}`).substring(0, 10),
    progress: c.progress
  }))

  const QuizComponent = ({ lesson, courseId, onClose, onComplete }) => {
    const quizKey = `${courseId}-${lesson.id}`
    const currentQuiz = quizzes[quizKey] || []
    const currentQuestion = currentQuiz[currentQuizQuestion]
    const quizScore = quizSubmitted ? Object.values(quizAnswers).filter((ans, idx) => ans === currentQuiz[idx]?.correct).length : 0

    if (quizSubmitted) {
      const percentage = Math.round((quizScore / currentQuiz.length) * 100)
      const passed = percentage >= 70

      // Enregistrer le score si l'utilisateur est connecté
      React.useEffect(() => {
        if (user && passed) {
          recordQuizScore(courseId, lesson.id, quizScore, percentage)
          // Vérifier si badge "Perfect Score" doit être débloqué
          if (percentage === 100) {
            addBadge('perfect_score', 'Perfect Scorer')
          }
        }
      }, [quizSubmitted])

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${passed ? 'text-secondary' : 'text-orange-500'}`}>
                {percentage}%
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {passed ? t('academy.quizPassed') : t('academy.quizFailed')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('academy.scoreMessage')}: {quizScore}/{currentQuiz.length}
              </p>
              
              {user && passed && (
                <div className="bg-green-50 p-4 rounded mb-6 flex items-center justify-center gap-2">
                  <CheckCircle className="text-secondary" size={24} />
                  <div className="text-left">
                    <span className="text-green-700 font-semibold block">{t('academy.lessonCompleted')}</span>
                    <span className="text-green-600 text-sm">+{percentage >= 90 ? 150 : percentage >= 80 ? 100 : 75} Points earned!</span>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded mb-6 text-left max-h-96 overflow-y-auto">
                <h4 className="font-bold mb-3">Review:</h4>
                {currentQuiz.map((q, idx) => (
                  <div key={idx} className="mb-4 pb-4 border-b last:border-b-0">
                    <p className="text-sm font-semibold mb-2">{q.question}</p>
                    <div className={`text-sm ${quizAnswers[idx] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {quizAnswers[idx] === q.correct ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Correct: {q.options[q.correct]}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (passed) {
                    onComplete()
                  } else {
                    setCurrentQuizQuestion(0)
                    setQuizAnswers({})
                    setQuizSubmitted(false)
                  }
                }}
                className="bg-secondary text-white py-2 px-6 rounded font-semibold hover:bg-primary transition"
              >
                {passed ? t('academy.continueLesson') : t('academy.retryQuiz')}
              </button>
              <button
                onClick={onClose}
                className="bg-gray-400 text-white py-2 px-6 rounded font-semibold hover:bg-gray-500 transition ml-2"
              >
                {t('academy.close')}
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{t('academy.quiz')}</h3>
              <p className="text-sm text-gray-100 mt-1">{lesson.title}</p>
              <p className="text-sm text-gray-100">{t('academy.questionProgress')}: {currentQuizQuestion + 1}/{currentQuiz.length}</p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="bg-gray-100 h-2">
            <div
              className="bg-secondary h-2 transition-all"
              style={{ width: `${((currentQuizQuestion + 1) / currentQuiz.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <div className="p-8">
            <h4 className="text-lg font-bold mb-6 text-gray-800">{currentQuestion.question}</h4>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuizAnswers({ ...quizAnswers, [currentQuizQuestion]: idx })}
                  className={`w-full p-4 text-left rounded transition ${
                    quizAnswers[currentQuizQuestion] === idx
                      ? 'bg-secondary text-white border-2 border-primary'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      quizAnswers[currentQuizQuestion] === idx
                        ? 'bg-white border-white'
                        : 'border-gray-400'
                    }`}>
                      {quizAnswers[currentQuizQuestion] === idx && <div className="w-3 h-3 bg-secondary rounded-full"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 justify-between">
              <button
                onClick={() => setCurrentQuizQuestion(Math.max(0, currentQuizQuestion - 1))}
                disabled={currentQuizQuestion === 0}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded font-semibold hover:bg-gray-400 disabled:opacity-50 transition"
              >
                {t('academy.previous')}
              </button>

              {currentQuizQuestion === currentQuiz.length - 1 ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  className="px-6 py-2 bg-secondary text-white rounded font-semibold hover:bg-primary transition"
                >
                  {t('academy.submitQuiz')}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuizQuestion(currentQuizQuestion + 1)}
                  className="px-6 py-2 bg-secondary text-white rounded font-semibold hover:bg-primary transition"
                >
                  {t('academy.next')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-8">
      <div className="max-w-7xl mx-auto">
        {/* Show Quiz */}
        {showQuiz && selectedLesson && selectedCourse ? (
          <QuizComponent
            lesson={selectedLesson}
            courseId={selectedCourse.id}
            onClose={() => {
              setShowQuiz(false)
              setCurrentQuizQuestion(0)
              setQuizAnswers({})
              setQuizSubmitted(false)
            }}
            onComplete={() => {
              const lessonKey = `${selectedCourse.id}-${selectedLesson.id}`
              setCompletedLessons({ ...completedLessons, [lessonKey]: true })
              setShowQuiz(false)
              setCurrentQuizQuestion(0)
              setQuizAnswers({})
              setQuizSubmitted(false)
            }}
          />
        ) : null}

        {/* Show Course Lessons View */}
        {showCourseLessons && selectedCourse && !showQuiz ? (
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white">{t(`academy.${selectedCourse.titleKey}`)}</h2>
                <p className="text-gray-100 mt-2">{t(`academy.${selectedCourse.descKey}`)}</p>
              </div>
              <button
                onClick={() => {
                  setShowCourseLessons(false)
                  setSelectedLesson(null)
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded"
              >
                <ArrowLeft size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 min-h-screen">
              {/* Lessons List */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <BookOpen size={20} className="mr-2" />
                  {t('academy.lessons')} ({selectedCourse.lessonsList.length})
                </h3>
                <div className="space-y-2">
                  {selectedCourse.lessonsList.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`p-4 rounded-lg cursor-pointer transition ${
                        selectedLesson?.id === lesson.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-semibold">{lesson.title}</div>
                      <div className="text-sm mt-1 flex items-center gap-1">
                        <Clock size={14} />
                        {lesson.duration}
                      </div>
                      {completedLessons[`${selectedCourse.id}-${lesson.id}`] && (
                        <div className="text-xs mt-2 flex items-center gap-1">
                          <CheckCircle size={14} />
                          {t('academy.completed')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lesson Content */}
              <div className="lg:col-span-2">
                {selectedLesson ? (
                  <div className="bg-gray-50 p-8 rounded-lg max-h-[70vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold text-primary mb-4">{selectedLesson.title}</h3>
                    <div className="flex items-center gap-2 mb-6 text-gray-600 pb-6 border-b">
                      <Clock size={18} />
                      <span className="font-semibold">{selectedLesson.duration}</span>
                    </div>
                    
                    {/* Lesson Content - Formatted */}
                    <div className="bg-white p-6 rounded-lg mb-6 leading-relaxed text-gray-700 prose prose-sm max-w-none">
                      {selectedLesson.content.split('\n').map((paragraph, idx) => {
                        // Handle headers
                        if (paragraph.startsWith('## ')) {
                          return <h2 key={idx} className="text-xl font-bold text-primary mt-6 mb-3">{paragraph.replace('## ', '')}</h2>
                        }
                        if (paragraph.startsWith('### ')) {
                          return <h3 key={idx} className="text-lg font-semibold text-primary-dark mt-4 mb-2">{paragraph.replace('### ', '')}</h3>
                        }
                        // Handle bold text
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return <p key={idx} className="font-semibold text-gray-800 mt-2">{paragraph.replace(/\*\*/g, '')}</p>
                        }
                        // Handle bullet points
                        if (paragraph.startsWith('- ')) {
                          return (
                            <li key={idx} className="ml-6 mt-1 text-gray-700">
                              {paragraph.replace('- ', '')}
                            </li>
                          )
                        }
                        // Handle tables (simple format)
                        if (paragraph.includes('|')) {
                          return <p key={idx} className="text-gray-600 text-sm font-mono mt-2">{paragraph}</p>
                        }
                        // Handle code blocks
                        if (paragraph.startsWith('```') || paragraph === '```') {
                          return null
                        }
                        // Regular paragraphs
                        if (paragraph.trim()) {
                          return <p key={idx} className="mt-3 text-gray-700 leading-relaxed">{paragraph}</p>
                        }
                        return null
                      })}
                    </div>

                    {/* Quiz Info */}
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                      <p className="text-blue-800 flex items-center gap-2">
                        <Brain size={18} />
                        <span className="font-semibold">{quizzes[`${selectedCourse.id}-${selectedLesson.id}`]?.length || 0} {t('academy.questionsInQuiz')}</span>
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="flex-1 bg-secondary text-white py-3 px-6 rounded font-semibold hover:bg-primary transition flex items-center justify-center gap-2"
                      >
                        <FileText size={18} />
                        {t('academy.takeQuiz')}
                      </button>
                      <button
                        onClick={() => {
                          setCompletedLessons({...completedLessons, [`${selectedCourse.id}-${selectedLesson.id}`]: !completedLessons[`${selectedCourse.id}-${selectedLesson.id}`]})
                        }}
                        className={`flex-1 py-3 px-6 rounded font-semibold transition flex items-center justify-center gap-2 ${
                          completedLessons[`${selectedCourse.id}-${selectedLesson.id}`]
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        <CheckCircle size={18} />
                        {completedLessons[`${selectedCourse.id}-${selectedLesson.id}`] ? t('academy.markIncomplete') : t('academy.markComplete')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center h-96">
                    <p className="text-center text-gray-600 text-lg">{t('academy.selectLesson')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">{t('academy.title')}</h1>
              <p className="text-xl text-gray-100">{t('academy.subtitle')}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">{courses.length}</div>
                <div className="text-gray-600">{t('academy.courses')}</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl font-bold text-secondary mb-2">2</div>
                <div className="text-gray-600">{t('academy.completed')}</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl font-bold text-accent mb-2">1</div>
                <div className="text-gray-600">{t('academy.inProgress')}</div>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6">{t('academy.progress')}</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" fill="#2ecc71" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer transform hover:scale-105"
                  onClick={() => {
                    setSelectedCourse(course)
                    setShowModal(true)
                  }}
                >
                  <div className="bg-gradient-to-r from-primary to-secondary p-4 h-24"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{t(`academy.${course.titleKey}`)}</h3>
                    <p className="text-gray-600 mb-4">{t(`academy.${course.descKey}`)}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">{t('academy.progress')}</span>
                        <span className="text-primary font-bold">{course.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="text-sm text-gray-600 mb-4 space-y-1">
                      <div>📚 {course.modules} {t('academy.courseModules')}</div>
                      <div>👥 {course.enrollees} {t('academy.enrolled')}</div>
                      <div>⏱️ {course.duration}</div>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-secondary text-white py-3 rounded font-semibold hover:bg-primary transition flex items-center justify-center gap-2">
                      {course.status === 'completed' ? (
                        <>
                          <Award size={18} />
                          {t('academy.viewCertificate')}
                        </>
                      ) : course.status === 'inProgress' ? (
                        <>
                          <CheckCircle size={18} />
                          {t('academy.continueCourse')}
                        </>
                      ) : (
                        <>
                          <Play size={18} />
                          {t('academy.startCourse')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Detail Modal */}
            {showModal && selectedCourse && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-6 flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-white">{t(`academy.${selectedCourse.titleKey}`)}</h2>
                      <p className="text-gray-100 mt-2">{t(`academy.${selectedCourse.descKey}`)}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowModal(false)
                        setSelectedCourse(null)
                      }}
                      className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-8">
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-blue-50 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-primary">{selectedCourse.duration}</div>
                        <div className="text-sm text-gray-600">{t('academy.duration')}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-secondary">{selectedCourse.lessons}</div>
                        <div className="text-sm text-gray-600">{t('academy.lessons')}</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedCourse.modules}</div>
                        <div className="text-sm text-gray-600">{t('academy.modules')}</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-orange-600">{selectedCourse.progress}%</div>
                        <div className="text-sm text-gray-600">{t('academy.progress')}</div>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-primary mb-4">{t('academy.topicsLearned')}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedCourse.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center bg-gray-50 p-3 rounded">
                            <CheckCircle size={16} className="text-secondary mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-gray-700">{t('academy.courseProgress')}</span>
                        <span className="font-bold text-primary">{selectedCourse.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setShowModal(false)
                          setShowCourseLessons(true)
                        }}
                        className="flex-1 bg-secondary text-white py-3 rounded font-semibold hover:bg-primary transition flex items-center justify-center gap-2"
                      >
                        <Play size={18} />
                        {selectedCourse.status === 'completed' 
                          ? t('academy.reviewAgain')
                          : selectedCourse.status === 'inProgress'
                          ? t('academy.continueCourse')
                          : t('academy.startCourse')}
                      </button>
                      {selectedCourse.status === 'completed' && (
                        <button
                          onClick={() => setShowModal(false)}
                          className="flex-1 bg-primary text-white py-3 rounded font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
                        >
                          <Award size={18} />
                          {t('academy.downloadCertificate')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

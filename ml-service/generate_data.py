import pandas as pd
import numpy as np

np.random.seed(42)

brands = ['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Tata', 'Mahindra']
fuel_types = ['Petrol', 'Diesel', 'CNG']
transmissions = ['Manual', 'Automatic']

n = 500
data = {
    'brand': np.random.choice(brands, n),
    'year': np.random.randint(2012, 2024, n),
    'km_driven': np.random.randint(5000, 150000, n),
    'fuel_type': np.random.choice(fuel_types, n),
    'transmission': np.random.choice(transmissions, n),
}

df = pd.DataFrame(data)

# Simple price formula with some randomness (simulates real-world price patterns)
base_price = 500000
df['price'] = (
    base_price
    + (df['year'] - 2012) * 40000
    - (df['km_driven'] / 1000) * 500
    + df['transmission'].map({'Manual': 0, 'Automatic': 150000})
    + df['fuel_type'].map({'Petrol': 0, 'Diesel': 50000, 'CNG': -30000})
    + df['brand'].map({'Maruti': 0, 'Hyundai': 50000, 'Honda': 80000, 'Toyota': 120000, 'Tata': 20000, 'Mahindra': 40000})
    + np.random.normal(0, 30000, n)  # random noise
)

df['price'] = df['price'].clip(lower=100000).round(-3)  # no negative prices, round to nearest 1000

df.to_csv('car_data.csv', index=False)
print("Dataset generated:", df.shape)
print(df.head())